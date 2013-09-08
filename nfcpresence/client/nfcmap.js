Template.nfcmap.nfcmap = function() {
    return NFCMAP.find({}).fetch();
}

Template.nfcmap.nfcmapassigned = function() {
    return NFCMAP.find({nfcid: {$ne: undefined}}).fetch();
}
