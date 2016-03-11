



var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('databases/words.sqlite');
db.run("PRAGMA case_sensitive_like = true");

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


    // Use our query clause:
    var query = ("SELECT * FROM words WHERE id=" + wordId + " ");

    db.all(query, function (err, data) {

        if (err) {
            res.status(500).send("Database Error");
        } else {
            res.status(200).json(data);
        }
    });
});


// DELETE -----------------------------------------------------------------delete by word id in dictionary


router.delete('/dictionary/:wordId', function (req, res, next) {
var wordId = req.params.wordId;


// Use our query clause:
var query = ("DELETE FROM words WHERE id=" + wordId);



var responseObject = {
    "id": wordId,
    "confirmation": "Word was deleted"
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
//});


// PUT -----------------------------------------------------------------update by word id in dictionary


router.put('/dictionary/:wordId', function (req, res, next) {

var wordId = req.params.wordId;
    
var word = req.body.word;    
    
console.log(req.body);
    
    
// Use our query clause:
var query = ("UPDATE words SET  word='"+ word +  "' WHERE id=" + wordId);



var responseObject = {
    "id": wordId,
    "confirmation": "Word was updated"
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
//});



// POST -----------------------------------------------------------------update by word id in dictionary


router.post('/dictionary/', function (req, res, next) {

//var wordId = req.params.wordId;
    
var word = req.body.word;    
    
console.log(req.body);
    
    
// Use our query clause:
var query = ("INSERT INTO words SET (word) VALUES('" + word + "')");



var responseObject = {
    "id": wordId,
    "confirmation": "Word was created"
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
//});





module.exports = router;
