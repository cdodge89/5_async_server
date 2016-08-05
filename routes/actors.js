var express = require('express');
var data = require('../data/moviedb');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    })

router.route('/:id')
    .get(function(req,res){
        var id = req.params.id;
        var actor = getActorById(id);
        if(actor){
            res.json(actor);
        } else {
            res.status(404);
            console.error('404 ', 'ACTOR NOT FOUND');
            res.end();
        }
    })

//function declarations

function getActorById(id){
    var movies = data.movies;
    for(var i = 0; i < movies.length; i++){
        var movie = movies[i];
        for(var j = 0; j < movie.actors.length; j++){
            var actor = movie.actors[j];
            if(actor.id === +id){
                return actor;
            }
        }
    }
    return false;
}

module.exports = router;