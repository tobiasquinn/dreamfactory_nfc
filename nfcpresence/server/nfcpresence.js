NFC = new Meteor.Collection("nfc");
MATRIX = new Meteor.Collection("matrix");
NFCMAP = new Meteor.Collection('nfcmap');

NFC.remove({});
NFCMAP.remove({});

Meteor.Router.add({
    '/nfcinsert/:id': function(id) {
        console.log("NFC PRESENT");
        console.log("ID ", id);
        // check if we have the card in the map, if not show assignment
        if (NFCMAP.find({nfcid: id}).count() === 0) {
            console.log(id, "not found in map");
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
