module.exports = function (app) {
    var api = app.api.apiSpotify;

    //config de rotas
    app.get('/api/login', api.redirectToLoginSpotify);
    app.get('/api/callback', api.redirectToApp);



};
