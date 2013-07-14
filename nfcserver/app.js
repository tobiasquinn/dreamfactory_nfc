
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.send("nfcserver REST server");    
});

app.post('/nfc/:uuid', function(req, res) {
    console.log("nfc POST " + req.uuid);
    res.send("SUCCESS");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
