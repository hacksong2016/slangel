var helpmeData = new ReactiveVar({});

Template.appeal.onCreated(function(){
  var helpmeId = FlowRouter.getParam("id");

  Meteor.call('helpme', {_id: helpmeId}, (error, result)=>{
    if(error) {
      console.log(error);
      return;
    }
    console.log(result);
    helpmeData.set(result);
  });
});

Template.appeal.events({
  'click #appeal-deactivate': function(event, template) {
    event.preventDefault();
    Modal.show('jobDeactivate',template.data);
  }
});

Template.appeal.helpers({
  '_id': function() {
    return helpmeData.get()._id;
  },
  'title': function() {
    return helpmeData.get().title;
  },
  'company': function() {
    return helpmeData.get().company;
  },
  'location': function() {
    return helpmeData.get().location;
  },
  'url': function() {
    return helpmeData.get().url;
  },
  'hasLabel': function() {
    return helpmeData.get().hasLabel;
  },
  'contact': function() {
    return helpmeData.get().contact;
  },
  'featured': function() {
    return helpmeData.get().featured;
  },
  'createdAt': function() {
    return helpmeData.get().createdAt;
  },
  'status': function() {
    return helpmeData.get().status;
  },
  'htmlDescription': function() {
    return helpmeData.get().htmlDescription;
  },
  'userId': function() {
    return helpmeData.get().userId;
  },
  'hasLabel': function() {
    return this.jobType || this.remote || this.featured;
  }
});
