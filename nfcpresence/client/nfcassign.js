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
