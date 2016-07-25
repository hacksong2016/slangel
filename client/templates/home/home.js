Template.home.onCreated(function(){
  Meteor.subscribe('appeals', {}, {
    sort: {createdAt: -1},
    limit: 6
  });
  Meteor.subscribe('profiles', {}, {
    sort: {createdAt: -1},
    limit: 6
  });
});

Template.home.helpers({
  appeals: function(){
    return Appeals.find({}, {limit: 6});
  },
  helpers: function(){
    return Profiles.find({}, {limit: 6});
  }
});

Template.home.events({
  "event": function(e, t){

  }
});
