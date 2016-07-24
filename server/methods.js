Meteor.methods({
  "profile": function (selector) {
    var profile = Profiles.findOne(selector);
    return profile;
  }
});
