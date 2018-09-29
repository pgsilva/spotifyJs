var request = require('request'); // "Request" library
var querystring = require('querystring');


var client_id = '09173ed65a9e472fb04d65b67d4bb470'; // Your client id
var client_secret = '2e5be889c0b74cd7aeb907eb66d895b3'; // Your secret
//var redirect_uri = 'http://localhost:3000/api/callback'; // Your redirect uri
var redirect_uri = 'https://spotifynodejs.herokuapp.com/api/callback';
var playlistToken = 'BQCc621aQeoE-6II90df-G3gvyLkXl4bjGuv266mlJ3gKnb2idODYqLuCYPC3KWHcrTOk_BoMZxlvJTe_cDAPbH_Lp_p13KGJvFFedt3x1R231iDlshAX0al5oTsBr-wiNe_ZjDwSqaYTOmaepRoscaYUH0WrmoPFioJ_q4nujtZ5YbgEMTluZZs4nBodCXIZXjhcnaeIdi1jm8XKHf8uPiXIwhzvnIOClU';

var api = {};
var resultSeassion = "";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

api.redirectToLoginSpotify = function (req, res) {
    console.log("go");

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // a aplicacao precisa de autenticidade 
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
};

api.redirectToApp = function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    //console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#/profile');

                getSession(access_token, refresh_token);

            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
};

api.getSessionUp = function (req, res) {
    if (resultSeassion) {
        res.json(resultSeassion);
    }
};

function getSession(access_token, refresh_token) {

    resultSeassion = {
        "refresh_token": refresh_token,
        "access_token": access_token
    };

    console.log(" OLHA AQUI " + resultSeassion.refresh_token);
    return resultSeassion;
}

api.getProfile = function (req, res) {
    console.log("getProfile: " + req);

    var access_token = req.body.access_token,
        refresh_token = req.body.refresh_token;

    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function (error, response, body) {
        console.log(body);
        res.json(body);
    });

};

api.refreshPlaylist = function (req, res) {

    var access_token = req.body.access_token,
        refresh_token = req.body.refresh_token;

    var options = {
        url: 'https://api.spotify.com/v1/users/' + req.body.id + '/playlists',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    // use the access token to access the Spotify Web API
    request.get(options, function (error, response, body) {
        //console.log(body);
        res.json(body);
    });
};

api.followPlaylist = function (req, res) {
    console.log(req.body.id);
    var access_token = req.body.access_token,
        refresh_token = req.body.refresh_token;

    var options = {
        url: 'https://api.spotify.com/v1/playlists/' + req.body.id + '/followers',
        headers: { 'Authorization': 'Bearer ' + access_token },
        form: {
            public: false
        },
        
        json: true
    };

    request.put(options, function (error, response, body) {
       
        console.log(body);
        var seguiu = { data: "Deu tudo certo por aqui e ai ?" }
        res.json(seguiu);

    });

};

module.exports = api;