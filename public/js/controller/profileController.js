angular.module('dojo').controller('ProfileController', function ($scope, $http, spotify_global) {

    // funçoes de escopo
    $scope.getProfile = getProfile;
    $scope.refreshPlaylist = refreshPlaylist;
    $scope.testeFollow = testeFollow;

    // variaveis e objetos de escopo
    $scope.refresh = {};
    $scope.session = {};
    $scope.profile = {};
    $scope.playlist = {};
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

                refreshPlaylist();
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
                angular.forEach(res.data.items, function (val, key) {
                    switch (val.id) {
                        case spotify_global.id_hooray:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_brilhantina:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_brasileiragem:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_rock:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_churras:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_compton:
                            $scope.playlists.push(val);
                            break;
                        case spotify_global.id_lean:
                            $scope.playlists.push(val);
                            break;
                    }
                });
                console.log($scope.playlists);

            }).catch(function (err) {
                console.log(err);
            })
        }
    };

    function testeFollow() {
        $scope.playlist.access_token = $scope.session.data.access_token;
        $scope.playlist.refresh_token = $scope.session.data.refresh_token;
        $scope.playlist.id = spotify_global.id_teste;

        if (spotify_global.id_teste) {
            var teste = $http.post('api/follow/playlist', $scope.playlist);
            teste.then(function (res) {
                console.log('Já seguiu a playlist voador');
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
});
