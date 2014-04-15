var app = angular.module('listapp', ['ui.bootstrap','LocalStorageModule']).
    config(function($routeProvider,$locationProvider) {
    //this is so we can do regualr urls, instead of hashbangs
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {
            templateUrl: 'partials/list.ngt',
            controller: 'ListController'
        }).
        when('/playlists', {
            templateUrl: 'partials/listPlaylists.ngt',
            controller: 'PlaylistController'
        }).
        otherwise({
            redirectTo: '/'
    });
});

// spotify has won service
app.service('SpotifyService',function($http) {
	return {
		searchSpotify: function(songName) {
			return $http.get('/backlift/tunnel/spotify_tunnel/search/1/track.json?q=' + songName).then(function(response){
            var numTracks  = response.data.tracks.length;
            var dataArray = [];
            for(var i=0;i<numTracks;i++) {
                // add the track name and band album to object
                //console.log(response.data);
                dataArray.push({"name":response.data.tracks[i].name + ' - ' + response.data.tracks[i].artists[0].name,"album":response.data.tracks[i].album.name,"release_year": response.data.tracks[i].album.released});
            }
            
            return dataArray;
        });
    }
	};  
});

// app.factory('ModalService',function($http) {
//    return {
//       ok: function () {
// 	    // $moda lInstance.close($scope.selected.item);
// 	  	},
// 	  	cancel: function () {
// 	    // $modalInstance.dismiss('cancel');
// 	  	}
//    };
// });
