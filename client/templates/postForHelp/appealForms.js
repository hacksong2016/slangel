AutoForm.addHooks(['appealNew', 'appealEdit'], {
	after: {
		insert: function(error, result) {
			if (error) {
				console.log("Insert Error:", error);
			} else {
				console.log("appeal Created");
				FlowRouter.go('/myAppeals');
			}
		},
		update: function(error, result) {
			if (error) {
				console.log("Update Error:", error);
			} else {
				console.log("appeal Edited");
				FlowRouter.go('/myAppeals');
			}
		}
	}
});

Template.appealEdit.onCreated(function(){
	var appealId = FlowRouter.getParam("id");

	Meteor.subscribe('appeals', {_id: appealId}, {});
});

Template.appealEdit.helpers({
  appeal: function(){
		var appealId = FlowRouter.getParam("id");
    return Appeals.findOne({_id: appealId});
  }
});

Template.appealEdit.events({
	'click #cancel':function(event, template){
		event.preventDefault();
		Router.go("appeal",{_id:this.appeal._id});
	}
})
