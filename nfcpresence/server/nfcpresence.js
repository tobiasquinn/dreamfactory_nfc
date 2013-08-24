Meteor.Router.add({
    '/nfcinsert/:id': function(id) {
        console.log("NFC PRESENT");
        console.log("ID ", id);
    },
    '/nfcremoved': function() {
        console.log("NFC REMOVED");
    },
});
