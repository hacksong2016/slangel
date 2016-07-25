var subCount = new ReactiveVar(12);

Template.helpMe.onCreated(function(){
  this.autorun(function() {
    Meteor.subscribe('appeals', {}, {
      sort: {createdAt: -1},
      limit: subCount.get()
    });
  });
});

Template.helpMe.helpers({
  appeals: function(){
    return Appeals.find();
  },
});

Template.helpMe.events({
  "click [name=more]": function(event, template){
    subCount.set(subCount.get() + 12);
  }
});
