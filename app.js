var express = require('express');
var data = require('./data/moviedb.json');
var app = express();
var port = 3000;
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var quotes = require('./routes/quotes');

app.get('/', function(req,res){
    quotes = [];
    for(var i=0; i < data.movies.length; i++){
        quotes.push(data.movies[i].quotes);
    }
    res.json(quotes);
    res.end();
});
app.use('/movies', movies);
app.use('/actors', actors);
app.use('/quotes', quotes);


app.listen(port);
console.log('listening on port ', port);