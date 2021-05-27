// server.js
var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history())
app.use(serveStatic(__dirname + "/dist"));

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/index.html'))
})
var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);