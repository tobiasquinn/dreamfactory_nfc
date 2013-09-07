MATRIX = new Meteor.Collection("matrix");

Meteor.startup(function() {
    Session.set('searchfilter', '');
});

Template.matrix.entry = function() {
    console.log(Session.get('searchfilter'));
    return MATRIX.find({}, {sort: {name: 1}});
}
