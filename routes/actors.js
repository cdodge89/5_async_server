var express = require('express');
var fs = require('fs-extra');
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