angular.module('dojo').controller('ProfileController', function ($scope, $http, spotify_global) {

    // funçoes de escopo
    $scope.getProfile = getProfile;
    $scope.refreshPlaylist = refreshPlaylist;

    // variaveis e objetos de escopo
    $scope.refresh = {};
    $scope.session = {};
    $scope.profile = {};
    $scope.urlImgProfile = " ";
    $scope.playlists = [];

    init();

    function init() {
        var promise = $http.get('/api/seassion');
        promise.then(function (res) {
            console.log('Feita com Sucesso!');
            $scope.session = res;
            console.log($scope.session);

            if ($scope.session.data) {
                getProfile($scope.session.data);
            }

        }).catch(function (err) {
            console.log(err);
        });
    };

    function getProfile(token) {
        if (token) {
            var data = token;
            var profile = $http.post('api/profile', data);
            profile.then(function (res) {
                console.log('Já chegou o perfil voador');
                $scope.profile = res.data;
                console.log(res);

                if (res.data.images.length > 0) {
                    $scope.urlImgProfile = res.data.images[0].url;
                };

            }).catch(function (err) {
                console.log(err);
            });
        } else {
            console.log('Algo deu errado ');
        }
    };

    function refreshPlaylist() {
        console.log($scope.session.data.access_token);
        $scope.refresh.access_token = $scope.session.data.access_token;
        $scope.refresh.refresh_token = $scope.session.data.refresh_token;
        $scope.refresh.id = spotify_global.id_pg;

        if ($scope.refresh) {
            var playlistglobal = $http.post('api/refresh/playlist', $scope.refresh);
            playlistglobal.then(function (res) {
                console.log('Já chegou a playlist voador');
                console.log(res);

            }).catch(function (err) {
                console.log(err);
            })
        }
    };
});