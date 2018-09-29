angular.module('dojo').controller('LoginController', function ($scope, $http, $window) {

    $scope.resultlogin = {};

    $scope.login = login;

    function login() {
        console.log("Iniciando Integração com Spotify");
       //$window.location.href = 'http://localhost:3000/api/login';
        $window.location.href = 'https://spotifynodejs.herokuapp.com/api/login';
        /*var promise = $http.get('/api/login');
        promise.then(function (res) {
            console.log('Feita com Sucesso!');
            $scope.resultlogin = res;
            console.log($scope.resultlogin);
        }).catch(function (err) {
            console.log(err);
        });*/

    };
});