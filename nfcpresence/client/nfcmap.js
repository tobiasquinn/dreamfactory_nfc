Template.nfcmap.nfcmap = function() {
    return NFCMAP.find({}).fetch();
}

Template.nfcmap.nfcmapassigned = function() {
    return NFCMAP.find({nfcid: {$ne: undefined}}).fetch();
}

Template.nfcmap.events = {
    'click .removeMapping': function(evt) {
        console.log(evt.target.value);
        var id = NFCMAP.findOne({nfcid: evt.target.value})._id;
        NFCMAP.remove({_id: id});
    },
}
