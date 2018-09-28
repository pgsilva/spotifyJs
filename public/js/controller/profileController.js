angular.module('dojo').controller('ProfileController', function ($scope, $http) {

    $scope.session = {};
    
    init();

    function init(){
        var promise = $http.get('/api/seassion');
        promise.then(function (res) {
            console.log('Feita com Sucesso!');
            $scope.session = res;
            console.log($scope.session);
        }).catch(function (err) {
            console.log(err);
        });
    };
});