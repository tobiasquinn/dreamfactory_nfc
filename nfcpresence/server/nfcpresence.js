NFC = new Meteor.Collection("nfc");
MATRIX = new Meteor.Collection("matrix");
NFCMAP = new Meteor.Collection('nfcmap');

NFC.remove({});
// remove all to be assigned on startup
NFCMAP.remove({needsassigning: true});

// allow client to remove all needassigning records from map
Meteor.methods({
    nfcremoveneedsassigning: function() {
        // only logged in users allowed
        if (Meteor.user()) {
            NFCMAP.remove({needsassigning: true});
        }
    },
    mapnfcidtorow: function(rownumber, name, nfcid) {
        NFCMAP.update({rowNumber: rownumber}, {$set: {name: name, nfcid: nfcid}});
    },
});

Meteor.Router.add({
    '/nfcinsert/:id': function(id) {
        console.log("NFC PRESENT");
        console.log("ID ", id);
        // check if we have the card in the map, if not show assignment
        if (NFCMAP.find({nfcid: id}).count() === 0) {
            console.log(id, "not found in map");
            // remove all hanging for assignement
            NFCMAP.remove({needsassigning: true});
            NFCMAP.insert({nfcid: id, needsassigning: true});
        } else {
            if (NFC.find({nfcid: id}).count() === 0) {
                NFC.insert({nfcid: id});
                return "PRESENT";
            } else {
                NFC.remove({nfcid: id});
                return "ABSENT";
            }
        }
    },
    '/nfcremoved': function() {
        console.log("NFC REMOVED");
    },
});
