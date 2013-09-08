NFCMAP = new Meteor.Collection('nfcmap');

Template.nfcassign.unassignedUsers = function() {
    return NFCMAP.find({assignedto: false});
}
