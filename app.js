var express = require('express');
var app = express();
var port = 3000;
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var quotes = require('./routes/quotes');
app.listen(port);
console.log('listening on port ', port);