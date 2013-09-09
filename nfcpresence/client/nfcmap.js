Template.nfcmap.nfcmap = function() {
    return NFCMAP.find({}).fetch();
}

Template.nfcmap.nfcmapassigned = function() {
    var assigned = NFCMAP.find({nfcid: {$ne: undefined}}).fetch();
    _.each(assigned, function(row) {
        var nfc = NFC.findOne({nfcid: row.nfcid});
        if (nfc) {
            row.present = true;
            row.date = moment(nfc.date).fromNow();
        }
    });
    assigned.sort(function(a,b) {
        a.name > b.name;
    });
    return assigned;
}

Template.nfcmap.events = {
    'click .removeMapping': function(evt) {
        var map = NFCMAP.findOne({nfcid: evt.target.value});
        Session.set('nfcmapconfirmaction', "Remove mapping for " + map.name);
        Session.set('nfcmapconfirmvalue', evt.target.value);
        $('#MODAL_nfcmapconfirm').modal('show');
    },
    'click .forceCheckout': function(evt) {
        Meteor.call("forcecheckout", evt.target.value);
    },
    'click .forceCheckin': function(evt) {
        Meteor.call("forcecheckin", evt.target.value);
    }
}

Template.nfcmapconfirm.confirmaction = function() {
    return Session.get('nfcmapconfirmaction');
}

Template.nfcmapconfirm.confirmvalue = function() {
    return Session.get('nfcmapconfirmvalue');
}

Template.nfcmapconfirm.events = {
    'click #nfcmapConfirm': function(evt) {
        var id = NFCMAP.findOne({nfcid: evt.target.value})._id;
        NFCMAP.remove({_id: id});
        $('#MODAL_nfcmapconfirm').modal('hide');
    },
}
