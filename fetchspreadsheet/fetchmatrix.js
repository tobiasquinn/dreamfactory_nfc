/* This should have some awesome to talk to a remote URL */
"use strict";

var spreadsheet_key = "https://docs.google.com/spreadsheet/pub?key=0Ao86AsMqPMUhdDBmMTN6RjFwWXBsN3ZhQ3hpSy1xVnc&single=true&gid=0&output=html"
//var sitename = "timetable.thewildschool.co.uk";
//var sitepass = "munchkins";
/* But for now we are localhost only */
var MongoClient = require('mongodb').MongoClient;
var Tabletop = require("tabletop");
var _ = require("underscore");
var util = require('util');
var XDate = require('xdate');

var LOCAL = true;
//var LOCAL = false;

// get the remote url then process the spreadsheet
if (LOCAL) {
    // // localhost
    var child = require("child_process").spawn("/bin/bash", ['-c', 'cd ../nfcpresence;meteor mongo --url']);
} else {
    // deployed
    var child = require("child_process").spawn("/bin/bash", ['-c', 'meteor mongo --url ' + sitename]);
}

var totalLines = 0;
// output capture
child.stdout.on('data', function(data) {
    if (data.toString().substring(0, 7) == "mongodb") {
        var url = data.toString().trim();
        console.log("DBURL", url);
        processSheets(url);
    }
});

if (LOCAL) {
    setTimeout(function() {
        console.log("Shouldn't be here, local update probably failed");
    }, 10000);
} else {
    child.stdin.write(sitepass + '\n');
}

// load the google spreadsheet data to the mongodb
var processSheets = function(url) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var tabletop = Tabletop.init({
            key: spreadsheet_key,
            callback: spreadsheetLoaded,
            simpleSheet: true
        });

        function spreadsheetLoaded(data) {
            console.log("HERE", data);
            var collection = db.collection('matrix');
            // remove all existing elements
            collection.remove({}, function(err, removed){});
            console.log("REMOVED ALL");
            // run through the elements, only deal with updates, no deletions
            // entries are only valid if there is a title present
            _.each(data, function(row, index) {
                console.log(row, index);
                collection.insert(row, {safe: true}, function(err, docs) {
                    if (err) throw err;
                });
            });
            process.exit();
        }
    });
}
