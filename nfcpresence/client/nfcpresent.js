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
    _.each(records, function(record) {
        var nfcid = NFCMAP.findOne({rowNumber: record.rowNumber}).nfcid;
        var date = NFC.findOne({nfcid: nfcid}).date;
        record.date = date;
    });
    // sort to place latest nfc entry at top of list
    records.sort(function(a,b) {
        return a.date < b.date;
    });
    return records;
};
