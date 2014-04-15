function ListController($parse,$scope,$http,SpotifyService,$modal,$log,localStorageService){

    $scope.result = undefined;
    $scope.items = [{}];
    var wrapper = new Array();

    $('#homeNav').attr('class','active');
    $('#playNav').attr('class','');
    
    // call spotify searcha to get query list of songs
    $scope.songs = function(songName) { 
        return SpotifyService.searchSpotify(songName);
    }
        
    $scope.addNewItem = function($item){
        newItem = {
            name: $item.name,
            album: $item.album,
            release_year: $item.release_year,
            deleted: false,
            archived: false
        }
        $scope.items.push(newItem);

        // clear the form text, 2-way binding \o/
        $scope.result = '';
    }

    // remove a song from list
    $scope.deleteItem = function($item){
        // remove from the model
        $scope.items.splice($scope.items.indexOf($item), 1);
        $item.deleted = true;
    }

    $scope.archiveItems = function(){
        for (var i in $scope.items) {
    	   if ($scope.items[i].deleted) {
    		  $scope.items[i].archived = true;
    	   }
    	}
    }

    /*** START MODAL METHODS ***/
    // save modal
    $scope.playlist = {
        selected_name:'',
        date_created: new Date(),
        tracks: new Array(),
        total_tracks:0
    };
    $scope.open = function () {
        //$log.log($scope.items);
        var pickedSongs = new Array();

        //loop through array of item and make obj to add to playlist obj
        for(var j=1;j<$scope.items.length;j++) {
            // $log.log($scope.items[j].name);
            pickedSongs.push({title: $scope.items[j].name});
        }
        $scope.playlist.tracks = pickedSongs;
        $scope.playlist.total_tracks = pickedSongs.length;
        
        // $log.log(pickedSongs);
        // var test = [];
        // test.push({name:"test"});
        // localStorageService.add('a', JSON.stringify(test));
        // $log.log(localStorageService.get('a'));
        
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: function ($scope, $modalInstance, $log, playlist) {
                $scope.playlist = playlist;
                $scope.ok = function () {
                    // localStorageService.add('playlist_name',playlist.selected_name);
                    // localStorageService.add('date_created',playlist.date_created);
                    //check if something is already in localstorage if it is, athen append it
                    // $log.log($scope.playlist);
                    // $log.log(JSON.parse(localStorageService.get('a')));
                    // var newwrapper = new array();
                    if(localStorageService.get('a') != null){
                        var test = localStorageService.get('a');

                        // var test = JSON.parse(localStorageService.get('a'));
                        //$log.log(test);
                       wrapper.push(JSON.stringify(test));
                       wrapper.push(JSON.stringify($scope.playlist));
                    }else{
                        wrapper.push(JSON.stringify($scope.playlist));
                    }
                    // $log.log(localStorageService.get('a'));                    
                    // var arrayCounter = wrapper.length;
                    //$log.log(wrapper);
                    localStorageService.add('a', wrapper);
                    $modalInstance.dismiss('cancel');
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                playlist: function () {
                    return $scope.playlist;
                }
            }
        });

        modalInstance.result.then(function (selected) {
            //NOTE: dont know what this is for... would like to..
          $scope.playlist.selected_name = selected;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

}
