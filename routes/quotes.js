var express = require('express');
var fs = require('fs-extra');
var uuid = require('uuid');
var dbPath = './data/moviedb.json'
//var data;

// function getData(callback){
//     fs.readJson(dbPath,function(err,jsonObj){
//         if(err){
//             console.log('error ',err);
//         }
//         callback(err,jsonObj);
//     });
// }

// fs.readJson(dbPath,function(err,jsonObj){
//     if(err){
//         console.log('error ',err);
//     }
//     var data = jsonObj;
// });

var router = express.Router();

router.route('/')
    .get(function(req, res){
        res.json(data);
        res.end();
    })
    .post(function(req,res){
        var data;
        getData(dbPath, function(err, jsonObj){
            data = jsonObj;
            var index = getMovieIndexByName(req.body.movie,data);
            if(Number.isInteger(index)){
                var quote = req.body.quote;
                quote.id = uuid.v1();
                console.log("quote ", quote);
                data.movies[index].quotes.push(quote);
                res.end("SUCCESS");
                fs.writeJson(dbPath,data,function(err){
                    if(err){
                        console.log(err);
                    }
                })
            } else{
                res.status(404);
                res.end("MOVIE NOT FOUND");
            }
        });
    })

router.route('/:id')
    .get(function(req,res){
        var id = req.params.id;
        var data;
        getData(dbPath, function(err, jsonObj){
            movies = jsonObj.movies;
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
        }).then(function(){
            if(quote){
                res.json(quote);
            } else {
                res.status(404);
                console.error('404 ', 'QUOTE NOT FOUND');
                res.end();
            }
        });
        //var quote = getQuoteById(id);
    })
    .put(function(req,res){
        var id = req.params.id;
        var quote = getQuoteById(id);
    })
    .delete(function(req,res){

    })

//function declarations
function getQuoteById(id){
    var movies;
    getData(dbPath, function(err, jsonObj){
        movies = jsonObj.movies;
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
    });
    
}

function getData(path, callback){
    fs.readJson(path, function(err, jsonObj){
        if(err){
            console.log(err);
        }
        callback(err, jsonObj);
    });
}

function getMovieIndexByName(name, dataObj){
    for(var i = 0; i < dataObj.movies.length; i++){
        if (dataObj.movies[i].title === name){
            return i;
        }
    }
    return null;
}

module.exports = router;