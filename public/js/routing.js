app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        //Routing home view
        .state('login', {
            url: '/',
            views: {
                "body": {
                    templateUrl: '../views/spot/login.html',
                    controller: 'LoginController'
                }
            }
        }).state('profile', {
            url: '/profile',
            views: {
                "body": {
                    templateUrl: '../views/spot/profile.html',
                    controller: 'ProfileController'
                },
                "navbar": { templateUrl: '../views/navbar.html' }
            }
        });

});