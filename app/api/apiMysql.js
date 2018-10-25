var mysql = require('mysql');
var api = {};

var con = mysql.createConnection({
    host: 'localhost',
    user: 'mytrace_v2',
    password: 'mytrace_v2',
    database: 'mytrace_v2'
});

api.select = function (req, res) {
    console.log("chegou a req");


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "call mytrace_v2.sp_contrato_blindagem(212)";

        con.query(sql, function (err, result) {
            if (err) throw err;
            var result = {
                query: sql,
                data: result
            };
            res.json(result);
        });

    });


};
module.exports = api;