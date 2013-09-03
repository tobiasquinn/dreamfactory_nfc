NFC = new Meteor.Collection("nfc");

Template.nfcpresent.nfc_present = function () {
    return NFC.find();
};
