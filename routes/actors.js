var express = require('express');
var data = require('../data/moviedb');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    })

//function declarations

function getActorById(id){
    for(var i = 0; i < data.length; i++){
        for(var i = 0; i < data[i].actors.length; i++){
            
        }
    }
}

module.exports = router;