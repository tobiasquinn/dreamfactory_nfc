NFC = new Meteor.Collection("nfc");

Template.nfcids.nfc_present = function () {
    return NFC.find();
};

//Template.hello.events({
//    'click input' : function () {
//        // template data, if any, is available in 'this'
//        if (typeof console !== 'undefined')
//    console.log("You pressed the button");
//    }
//});
