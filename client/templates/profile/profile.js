var profileData = new ReactiveVar({});

Template.profile.onCreated(function(){
  var userId = FlowRouter.getParam("id");

  Meteor.call('profile', {userId: userId}, (error, result)=>{
    if(error) {
      console.log(error);
      return;
    }
    console.log(result);
    profileData.set(result);
  });
});

Template.profile.helpers({
  availableForHire: function() {
    return profileData.get().availableForHire;
  },
  type: function() {
    return profileData.get().type;
  },
  location: function() {
    return profileData.get().location;
  },
  interestedIn: function() {
    return profileData.get().interestedIn;
  },
  url: function() {
    return profileData.get().url;
  },
  contact: function() {
    return profileData.get().contact;
  },
  resumeUrl: function() {
    return profileData.get().resumeUrl;
  },
  createdAt: function() {
    return profileData.get().createdAt;
  },
  htmlDescription: function() {
    return profileData.get().htmlDescription;
  },
  title: function() {
    return profileData.get().title;
  },
  displayName: function() {
    return profileData.get().name;
  },
  userId: function() {
    return profileData.get().userId;
  },
  beforeRemove: function() {
    return function(collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.title + '"?')) {
        this.remove();
        // analytics.track("Profile Removed");
        // Router.go('profiles');
      }
    };
  },
  splitInterestedIn: function() {
    if (interestedIn)
      return interestedIn.split(",");
  }
});
