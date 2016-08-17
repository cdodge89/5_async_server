var express = require('express');
var fs = require('fs-extra');
var uuid = require('uuid');
var data;
fs.readJson('./data/moviedb.json',function(err,jsonObj){
    if(err){
        console.log('error ',err);
    }
    var data = jsonObj;
});

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    });

router.route('/:id')
    .get(function(req,res){
        var id = req.params.id;
        var movie = getMovieById(id);
        if(movie){
            res.json(movie);
        } else {
            res.status(404);
            console.error('404 ', 'MOVIE NOT FOUND');
            res.end();
        }
    })

//function declarations
function getMovieById(id){
    var movies = data.movies;
    for(var i = 0; i < movies.length; i++){
        if(movies[i].id === +id){
            return movies[i];
        }
    }
    return false;
}


module.exports = router; 