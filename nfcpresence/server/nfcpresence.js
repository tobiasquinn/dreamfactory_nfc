NFC = new Meteor.Collection("nfc");

NFC.remove({});

Meteor.Router.add({
    '/nfcinsert/:id': function(id) {
        console.log("NFC PRESENT");
        console.log("ID ", id);
        if (NFC.find({nfcid: id}).count() === 0) {
            NFC.insert({nfcid: id});
            return "PRESENT";
        } else {
            NFC.remove({nfcid: id});
            return "ABSENT";
        }
    },
    '/nfcremoved': function() {
        console.log("NFC REMOVED");
    },
});
