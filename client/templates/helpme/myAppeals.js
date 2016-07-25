var subCount = new ReactiveVar(12);

Template.myAppeals.onCreated(function(){
  this.autorun(function() {
    Meteor.subscribe('appeals', {userId: Meteor.userId()}, {
      sort: {createdAt: -1},
      limit: subCount.get()
    });
  });
});

Template.myAppeals.helpers({
  appeals: function(){
    return Appeals.find({userId: Meteor.userId()});
  },
});

Template.myAppeals.events({
  "click [name=more]": function(event, template){
    subCount.set(subCount.get() + 12);
  }
});
