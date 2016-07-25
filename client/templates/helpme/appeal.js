Template.appeal.onCreated(function(){
	var appealId = FlowRouter.getParam("id");
	Meteor.subscribe('appeals', {_id: appealId}, {});
});

Template.appeal.events({
  'click #appeal-deactivate': function(event, template) {
    event.preventDefault();
    Modal.show('jobDeactivate',template.data);
  }
});

Template.appeal.helpers({
  appeal: function(){
		var appealId = FlowRouter.getParam("id");
    return Appeals.findOne({_id: appealId});
  },
  'hasLabel': function() {
    return this.jobType || this.remote || this.featured;
  }
});
