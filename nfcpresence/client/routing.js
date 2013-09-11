// navbar auto corresponds to route
Template.nav.rendered = function() {
    var page = Meteor.Router.page();
    if (page === "home") page = "";
    $('#navbar-nav li a[href="/' + page + '"]').parent().addClass('active');
};

Template.nav.iframed = function() {
    if (Meteor.Router.page() == "iframe")
        return true;
    else
        return false;
}

Meteor.Router.add({
    '/': 'home',
    '/nfcpresent': 'nfcpresent',
    '/iframe': 'iframe',
    '/matrix': 'matrix',
    '/matrix/name/:name': function(name) {
        Session.set('namedetail', name);
        return 'namedetail'
    },
    '/nfcassign': function() {
        if (Meteor.user())
            return 'nfcassign';
        else
            return 'home';
    },
    '/nfcmap': function() {
        if (Meteor.user())
            return 'nfcmap';
        else
            return 'home';
    },
    '*': 'home',
});
