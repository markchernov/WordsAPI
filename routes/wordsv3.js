var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('databases/words.sqlite');
db.run("PRAGMA case_sensitive_like = true");

router.get('/search/:abbrev', function(req, res, next) {
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
  var query = ( "SELECT id, word FROM words "
               +" WHERE " + likeClause + " ORDER BY word "); 
    
db.all(query, function(err,data) {  
    
if (err) { res.status(500).send("Database Error"); }
else { res.status(200).json(data); }
});
});   
    
    

module.exports = router;
  
  
  
  
  
  
  
  
  
  
  
  