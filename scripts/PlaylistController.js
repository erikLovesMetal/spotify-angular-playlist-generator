app.controller("PlaylistController", ['$scope','$log','localStorageService', function($scope,$log,localStorageService){

    $('#homeNav').attr('class','');
    $('#playNav').attr('class','active');

    $scope.data = "some data";
    $scope.playlists = [{}];

    $scope.getPlaylists = function(){
        $scope.playlists = new Array();
        // $log.log(JSON.parse(localStorageService.get('a')));
        var wrapper = new Array();
        // playlistCount.push(localStorageService.get('a'));
        //var parsedPlaylists = JSON.parse(localStorageService.get('a'));
        //$log.log(localStorageService.get('a'));
        // $log.log(localStorageService.get('a').length);
        for(var i=0;i<localStorageService.get('a').length;i++) {
            wrapper.push(JSON.parse(localStorageService.get('a')[i]));
        }
        // for(var i=0;i<1;i++) {
            // add the track name and band album to object
            // dataArray.push({"name":response.data.tracks[i].name + ' - ' + response.data.tracks[i].artists[0].name,"album":response.data.tracks[i].album.name,"release_year":     `                   response.data.tracks[i].album.released});
            //$scope.playlists.tracks = {name: parsedPlaylists.selected_name,date_created: parsedPlaylists.date_created,genre: 'metal',total_tracks: 66};
        // }
        
        //wrapper.push(parsedPlaylists);
        $scope.playlists = wrapper;
        $log.log($scope.playlists);

        //$log.log($scope.playlists);
        // $scope.playlists.name = 'test playlist';
        // $scope.playlists.genre = 'hardcore';
        // $scope.playlists.total_tracks = 66;

    }

    $scope.getPlaylists();

    

}]);


