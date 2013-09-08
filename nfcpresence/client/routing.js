// navbar auto corresponds to route
Template.nav.rendered = function() {
    var page = Meteor.Router.page();
    if (page === "home") page = "";
    $('#navbar-nav li a[href="/' + page + '"]').parent().addClass('active');
};

Meteor.Router.add({
    '/': 'home',
    '/nfcpresent': 'nfcpresent',
    '/matrix': 'matrix',
    '/matrix/name/:name': function(name) {
        Session.set('namedetail', name);
        return 'namedetail'
    },
    '/nfcassign': 'nfcassign'
});
