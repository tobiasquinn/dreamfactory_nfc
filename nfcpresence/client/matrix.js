MATRIX = new Meteor.Collection("matrix");

Meteor.startup(function() {
    Session.set('searchfilter', '');
});

Template.matrix.entry = function() {
    console.log(Session.get('searchfilter'));
    return MATRIX.find({name: { $regex: Session.get('searchfilter'), $options: 'i'}}, {sort: {name: 1}});
}

Template.matrix.events = {
    'keyup #searchfilter': function(evt) {
        Session.set('searchfilter', evt.target.value);
    },
}
