NFCMAP = new Meteor.Collection('nfcmap');

var nfcmapobserver = NFCMAP.find({needsassigning: true}).observe({
    added: function() {
        Meteor.Router.to('/nfcassign');
    },
    changed: function() {console.log("obs changed");}
});

Template.nfcassign.unassignedUsers = function() {
    var rows = NFCMAP.find({}).fetch();
    var filteredRows = _.filter(rows, function(row) {
        if ((row.assigned === undefined) && (row.needsassigning != true)) {
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

Template.nfcassign.nfcid = function() {
    var toassign = NFCMAP.findOne({needsassigning: true});
    if (toassign !== undefined) return toassign.nfcid;
    else return "Unknown";
}

Template.nfcassign.events = {
    'click .assignnfc': function(evt) {
        console.log($(evt.target).html());
    },
};
