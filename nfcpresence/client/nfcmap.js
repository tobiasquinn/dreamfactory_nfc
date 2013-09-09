Template.nfcmap.nfcmap = function() {
    return NFCMAP.find({}).fetch();
}

Template.nfcmap.nfcmapassigned = function() {
    var assigned = NFCMAP.find({nfcid: {$ne: undefined}}).fetch();
    _.each(assigned, function(row) {
        var nfc = NFC.findOne({nfcid: row.nfcid});
        if (nfc) {
            row.present = true;
            row.date = moment(nfc.date).fromNow();
        }
    });
    return assigned;
}

Template.nfcmap.events = {
    'click .removeMapping': function(evt) {
        var id = NFCMAP.findOne({nfcid: evt.target.value})._id;
        NFCMAP.remove({_id: id});
    },
}
