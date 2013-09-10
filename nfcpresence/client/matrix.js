MATRIX = new Meteor.Collection("matrix");

var REFRESH_URL = "http://matrix.thedreamfactory.net:9453/9yI04CuSx6NQ1Lf8am7m";

Meteor.startup(function() {
    Session.set('searchfilter', '');
});

Template.matrix.searchfilter = function() {
    return Session.get('searchfilter');
}

Template.matrix.entry = function() {
    return MATRIX.find({name: { $regex: Session.get('searchfilter'), $options: 'i'}}, {sort: {name: 1}});
}

Template.matrix.refreshResult = function() {
    return Session.get("refreshResult");
}

Template.matrix.events = {
    'keyup #searchfilter': function(evt) {
        Session.set('searchfilter', evt.target.value);
    },
    'click #clear': function() {
        Session.set('searchfilter', undefined);
    },
    'click #refreshMatrix': function() {
        $.get(REFRESH_URL, function(result) {
            console.log("REFRSH", result);
            Session.set('refreshResult', result);
        });
    },
}
