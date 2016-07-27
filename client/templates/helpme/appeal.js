var thisAppeal = new ReactiveVar({});

AutoForm.addHooks(['helps'], {
	before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(doc) {
      // Potentially alter the doc
			doc.appealsId = thisAppeal.get()._id;
			doc.appealsUserId = thisAppeal.get().userId;

			// console.log(thisAppeal.get());

			return doc;
      // Then return it or pass it to this.result()
      //return doc; (synchronous)
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  },
	after: {
		insert: function(error, result) {
			if (error) {
				console.log("help Insert Error:", error);
			} else {
				alert('感谢您的参与，您的帮助信息已经提交');
				console.log("help Created");
				// FlowRouter.go('/myAppeals');
			}
		},
		update: function(error, result) {
			if (error) {
				console.log("Update Error:", error);
			} else {
				console.log("help Edited");
				// FlowRouter.go('/myAppeals');
			}
		}
	}
});

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
    var appeal = Appeals.findOne({_id: appealId});
		thisAppeal.set(appeal);
		return appeal;
  },
  'hasLabel': function() {
    return this.jobType || this.remote || this.featured;
  }
});
