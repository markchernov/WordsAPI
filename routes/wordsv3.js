var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('databases/words.sqlite');
db.run("PRAGMA case_sensitive_like = true");


var Twitter = require("twitter");

var credentials = require("../.credentials.js");
var twitParams = credentials.twitParams;
var twitClient = new Twitter(credentials.twitCredentials);





router.get('/search/:abbrev', function (req, res, next) {
    var abbrev = req.params.abbrev;
    var threshold = req.query.threshold || 3;
    // Our default, case-INsensitive query clause:
    var likeClause = "lower(word) LIKE lower('" + abbrev + "%')";
    // Check for query parameter passed by client
    var caseSensitive = req.query.caseSensitive;
    if (caseSensitive === "true") {
        console.log("Case Sensitive");
        // Case-sensitive query:
        likeClause = "word LIKE '" + abbrev + "%'"
    }
    if (threshold && abbrev.length < Number(threshold)) {
        res.status(204).send() //204: Success, No Content.
        return;
    }
    // Use our query clause:
    var query = ("SELECT id, word FROM words " + " WHERE " + likeClause + " ORDER BY word ");

    db.all(query, function (err, data) {

        if (err) {
            res.status(500).send("Database Error");
        } else {
            res.status(200).json(data);
        }
    });
});


// GET -----------------------------------------------------------------by word id in dictionary


router.get('/dictionary/:wordId', function (req, res, next) {
    var wordId = req.params.wordId;

console.log(" in first get route");
    // Use our query clause:
    var query = ("SELECT * FROM words WHERE id=" + wordId + " ");

    db.get(query, function (err, data) {

        if (err) {
            res.status(500).send("Database Error");
        } else {
            //res.status(200).json(data);
            res.wordData = data;
            next();
        }
    });
});



//  get twitter

router.get('/dictionary/:wordId', function (req, res, next) {
    
    console.log(" in twitter router");
    
    var word = res.wordData.word;
    
    res.wordData.twitter = {};
    
    var twitSearch = "https://api.twitter.com/1.1/search/tweets.json?";
    
    twitSearch += "q=";
    twitSearch += "lang%3Aen%20";
    twitSearch += "%23" + word;
    twitSearch += "&result_type=recent";
    
    
    console.log(twitSearch ); 
    
    twitClient.get(twitSearch, twitParams, function(error, tweets, response){
        
        if(error)  {
            
             console.log(" in twitter error"); 
              console.log(error);
            
            
        }     
        else {
           
          console.log(" in twitter success");       
            
          console.log(" my tweets"  + tweets);  
            
          res.wordData.twitter = tweets;  
            
            
        }
        
        res.status(200).json(res.wordData);
        
    })
                  
                  
    
});
















// DELETE -----------------------------------------------------------------delete by word id in dictionary


router.delete('/dictionary/:wordId', function (req, res, next) {
var wordId = req.params.wordId;


// Use our query clause:
var query = ("DELETE FROM words WHERE id=" + wordId);



var responseObject = {
    "id": wordId,
    "confirmation": "was deleted"
};


  console.log(responseObject);  
    
    
db.run(query, function (err) {

    if (err) {
        res.status(500).send("Database Error")
    } else {
        res.status(200).json(responseObject)
    }


})


});



// PUT -----------------------------------------------------------------update by word id in dictionary


router.put('/dictionary/:wordId', function (req, res, next) {

var wordId = req.params.wordId;
    
var word = req.body.word;    
    
console.log(req.body);
    
    
// Use our query clause:
var query = ("UPDATE words SET  word='"+ word +  "' WHERE id=" + wordId);



var responseObject = {
    "id": wordId,
    "confirmation": "was updated"
};


  console.log(responseObject);  
    
    
db.run(query, function (err) {

    if (err) {
        res.status(500).send("Database Error")
    } else {
        res.status(200).json(responseObject)
    }


})


});



// POST -----------------------------------------------------------------update by word id in dictionary



router.post('/dictionary/', function (req, res, next) {

//var wordId = req.params.wordId;
    
var word = req.body.word;    
    
console.log("In post method with word:  " + word);
    
    
// Use our query clause:
var query = "INSERT INTO words(word) VALUES('" +word+ "')";



var responseObject = {
    "id" : " ",
    "confirmation": " was created"
};


console.log(responseObject);  
    
    
db.run(query, function (err) {

    if (err) {
        
        if(err.errno === 19) {
        
           
            res.status(400).send("Word already exist Error")
            
            }
            
        else {
            
            res.status(500).send("Database Error")
        
        }
        
        
        
        
    } else {
        
        responseObject.id = this.lastID;
        
        var newUrl = req.baseUrl + "/dictionary/"+ responseObject.id;
        
        res.set("Location", newUrl)
        
        console.log(this.lastID);
        
        console.log("Updated response object with incremented id" + responseObject.id);
        res.status(200).json(responseObject)
    }


});


});







module.exports = router;
