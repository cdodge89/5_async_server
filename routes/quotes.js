var express = require('express');
const fs = require('fs');
var file = 'moviedb.json';
var data;
var file_content = fs.readFile(file,function(err,data){
    if(err){
        console.log(err);
    } else{
        data = JSON.parse(data);
        console.log(data);
    }
});
//var data = JSON.parse(file_content);

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    })

router.route('/:id')
    .get(function(req,res){
        var id = req.params.id;
        var quote = getQuoteById(id);
        if(quote){
            res.json(quote);
        } else {
            res.status(404);
            console.error('404 ', 'QUOTE NOT FOUND');
            res.end();
        }
    })
    .post(function(req,res){

    })
    .put(function(req,res){

    })
    .delete(function(req,res){

    })

//function declarations
function getQuoteById(id){
    var movies = data.movies;
    for(var i = 0; i < movies.length; i++){
        var movie = movies[i];
        for(var j = 0; j < movie.quotes.length; j++){
            var quote = movie.quotes[j];
            if(quote.id === +id){
                return quote;
            }
        }
    }
    return false;
}

module.exports = router;