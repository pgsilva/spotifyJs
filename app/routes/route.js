module.exports = function (app) {
    var api = app.api.apiSpotify;
    var apiMysql = app.api.apiMysql;

    //config de rotas
    app.get('/api/login', api.redirectToLoginSpotify);
    app.get('/api/callback', api.redirectToApp);
    app.get('/api/seassion', api.getSessionUp);

    app.post('/api/profile', api.getProfile);
    app.post('/api/follow/playlist', api.followPlaylist);

    //config de rotas de refresh
    app.post('/api/refresh/playlist', api.refreshPlaylist);

    //get mysql
    app.get('/api/mysql/select', apiMysql.select);
};
