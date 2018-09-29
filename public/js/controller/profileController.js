angular.module('dojo').controller('ProfileController', function ($scope, $http, spotify_global, $window) {

    // funçoes de escopo
    $scope.getProfile = getProfile;
    $scope.refreshPlaylist = refreshPlaylist;
    $scope.raffaFollow = raffaFollow;
    $scope.followPlaylist = followPlaylist;

    // variaveis e objetos de escopo
    $scope.refresh = {};
    $scope.session = {};
    $scope.profile = {};
    $scope.playlist = {};
    $scope.urlImgProfile = " ";
    $scope.playlists = [];
    $scope.progress = [];
    $scope.followraff = false;
    $scope.lilraff = false;

    init();

    function init() {
        var promise = $http.get('/api/seassion');
        promise.then(function (res) {
            console.log('Feita com Sucesso!');
            $scope.session = res;
            if (!res) {
                $window.location.href = 'http://localhost:3000/#/'
            }
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
                } else {
                    $scope.urlImgProfile = "../../img/user.png"
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
                            $scope.progress.push(false);
                            break;
                        case spotify_global.id_brilhantina:
                            $scope.playlists.push(val);
                            $scope.progress.push(false);
                            break;
                        case spotify_global.id_brasileiragem:
                            $scope.playlists.push(val);
                            $scope.progress.push(false);
                            break;
                        case spotify_global.id_rock:
                            $scope.playlists.push(val);
                            $scope.progress.push(false);
                            break;
                        case spotify_global.id_lean:
                            $scope.playlists.push(val);
                            $scope.progress.push(false);
                            break;
                    }
                });
                console.log($scope.progress);

            }).catch(function (err) {
                console.log(err);
            })
        }
    };

    function raffaFollow() {
        $scope.followraff = true;
        $scope.playlist.access_token = $scope.session.data.access_token;
        $scope.playlist.refresh_token = $scope.session.data.refresh_token;
        $scope.playlist.id = spotify_global.id_raffaMoreira;

        if (spotify_global.id_teste) {
            var teste = $http.post('api/follow/playlist', $scope.playlist);
            teste.then(function (res) {
                console.log('raffa moreira mano');
                $scope.followraff = false;
                $scope.lilraff = true;
                console.log(res.data);

            }).catch(function (err) {
                console.log(err);
            });
            alert("Obrigado por entrar na brincadeira!");
        }
    };

    function followPlaylist(play, index) {
        $scope.progress[index] = true;

        $scope.playlist.access_token = $scope.session.data.access_token;
        $scope.playlist.refresh_token = $scope.session.data.refresh_token;
        $scope.playlist.id = play.id;

        if ($scope.playlist.id) {
            var teste = $http.post('api/follow/playlist', $scope.playlist);
            teste.then(function (res) {
                console.log('Já seguiu a playlist voador');
                console.log(res.data);
                $scope.progress[index] = false;
                $scope.lilraff = false;
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
});
