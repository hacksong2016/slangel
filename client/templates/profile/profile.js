Template.profile.onCreated(function(){
	var userId = FlowRouter.getParam("id");

	Meteor.subscribe('profiles', {userId: userId}, {});
});

Template.profile.helpers({
  profile: function(){
		var userId = FlowRouter.getParam("id");
    return Profiles.findOne({userId: userId});
  },
  beforeRemove: function() {
    return function(collection, id) {
      console.log(id);
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.title + '"?')) {
        this.remove();
        FlowRouter.go('/profile');
      }
    };
  },
  splitInterestedIn: function() {
    if (interestedIn)
      return interestedIn.split(",");
  }
});
