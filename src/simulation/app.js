"use strict";

var port = process.env.PORT || 8080;
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

server.listen(port, "localhost", () => {
    console.log(':: Express :: Listening on port ' + port);
});

app.use(express.static('./'));

//Allow accessing to homepage
app.get('/', (req, res) => {
    console.log('Loading the homepage /index.html');
    res.sendFile('/index.html', {
        root: __dirname
    });
})

//Expose all assets and urls under conndectFour/
app.get('/*', (req, res, next) => {
    var file = req.params[0];
    if (verbose) console.log(':: Express :: file requested : ' + file);
    res.sendFile(__dirname + '/' + file);
})