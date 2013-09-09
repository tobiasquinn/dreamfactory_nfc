Accounts.config({
  forbidClientAccountCreation: true,
});

Template.home.events = {
    'click .homeRoute': function(evt) {
        Meteor.Router.to(evt.target.value);
    },
}
