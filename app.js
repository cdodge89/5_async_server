var express = require('express');
var data = require('./data/moviedb.json');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var quotes = require('./routes/quotes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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