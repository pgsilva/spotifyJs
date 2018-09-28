var http = require('http'); 
var app = require('./config/express');

http.createServer(app, function(req, res){

    res.end('NodeJs' + valor);
    
}).listen(3000, function() {
    console.log('server ups in ' + this.address().port + ', its a music time !');
});