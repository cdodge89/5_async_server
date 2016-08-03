var express = require('express');
var data = require('../data/moviedb');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    })

module.exports = router; 