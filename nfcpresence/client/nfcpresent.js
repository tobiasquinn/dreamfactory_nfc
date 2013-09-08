NFC = new Meteor.Collection("nfc");

Template.nfcpresent.nfc_present = function () {
    // return a list of MATRIX information objects for the NFC ids that are present
    var nfcids = _.map(NFC.find().fetch(), function(value) {
        return value.nfcid;
    });
    var map = NFCMAP.find({nfcid: {$in: nfcids}}).fetch();
    // we have the map of present tags, we want the matrix records for the rows
    var maprows = _.map(map, function(value) { return value.rowNumber });
    var records = MATRIX.find({rowNumber: {$in: maprows}}).fetch();
    return records;
};
