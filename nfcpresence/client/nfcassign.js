NFCMAP = new Meteor.Collection('nfcmap');

var nfcmapobserver = NFCMAP.find({needsassigning: true}).observe({
    added: function() {
        // only redirect if logged in user
        if (Meteor.user()) {
            Meteor.Router.to('/nfcassign');
        }
    },
    changed: function() {console.log("obs changed");}
});

Template.nfcassign.unassignedUsers = function() {
    var rows = NFCMAP.find({}).fetch();
    var filteredRows = _.filter(rows, function(row) {
        if ((row.nfcid === undefined) && (row.needsassigning != true)) {
            return true;
        } else {
            return false;
        }
    });
    var intRows = _.map(filteredRows, function(row) {
        return parseInt(row.rowNumber);
    });
    var info = MATRIX.find({rowNumber: {$in: intRows}}, {sort: {name: 1}});
    return info;
}

Template.nfcassign.needsassigning = function() {
    var toassign = NFCMAP.findOne({needsassigning: true});
    return toassign;
}

Template.nfcassign.events = {
    'click .assignnfc': function(evt) {
        var rowNum = evt.target.value;
        var row = MATRIX.findOne({rowNumber: parseInt(rowNum)});
        // insert into map and remove needsassigning records
        Meteor.call('mapnfcidtorow', parseInt(rowNum), row.name, Template.nfcassign.needsassigning().nfcid);
        Meteor.call('nfcremoveneedsassigning');
        // return to nfcpresent matrix
        Meteor.Router.to('nfcpresent');
    },
};
