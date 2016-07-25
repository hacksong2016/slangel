var subCount = new ReactiveVar(12);

Template.helper.onCreated(function(){
  this.autorun(function() {
    Meteor.subscribe('profiles', {}, {
      sort: {createdAt: -1},
      limit: subCount.get()
    });
  });
});

Template.helper.helpers({
  helpers: function(){
    return Profiles.find();
  },
});

Template.helper.events({
  "click [name=more]": function(event, template){
    subCount.set(subCount.get() + 12);
  }
});
