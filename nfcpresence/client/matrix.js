MATRIX = new Meteor.Collection("matrix");

Template.matrix.entry = function() {
    return MATRIX.find();
}
