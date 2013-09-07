var autonav = function() {
    var path = this.path.slice(1);
    console.log("route", path, this);
    // update the active for navbar
    var a = $('#navbar-nav li a[href="' + this.path + '"]').parent();
    console.log(a);
    $('#navbar-nav li a[href="' + this.path + '"]').parent().addClass('active');
    if (path === "") return 'home';
    return path;
};

Meteor.Router.add({
    '/': autonav,
    '/nfcpresent': autonav,
    '/matrix': autonav,
    '/nfcdebug': autonav
});
