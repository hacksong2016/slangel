Meteor.methods({
  profile: function (selector) {
    var profile = Profiles.findOne(selector);
    return profile;
  },
  helpme: function (selector) {
    var helpme = Appeals.findOne(selector);
    return helpme;
  }
});
