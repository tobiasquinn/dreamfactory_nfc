NFCMAP = new Meteor.Collection('nfcmap');

Template.nfcassign.unassignedUsers = function() {
//    var unassignedUsers
    return NFCMAP.find({assignedto: false});
}
