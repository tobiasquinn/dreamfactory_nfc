NFCMAP = new Meteor.Collection('nfcmap');

var nfcmapobserver = NFCMAP.find({needsassigning: true}).observe({
    added: function() {
        Meteor.Router.to('/nfcassign');
    },
    changed: function() {console.log("obs changed");}
});

Template.nfcassign.unassignedUsers = function() {
//    var unassignedUsers
    return NFCMAP.find({assignedto: false});
}

Template.nfcassign.nfcid = function() {
    var toassign = NFCMAP.findOne({needsassigning: true});
    if (toassign !== undefined) return toassign.nfcid;
    else return "Unknown";
}
