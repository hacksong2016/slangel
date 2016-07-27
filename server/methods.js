Meteor.methods({
  profile: function (selector) {
    var profile = Profiles.findOne(selector);
    return profile;
  },
  helpme: function (selector) {
    var helpme = Appeals.findOne(selector);
    return helpme;
  },
  helpStatus: function (id, status) {
    // console.log(id, status);
    Helps.update({_id: id}, {
      $set: {
        status: status
      }
    });
  }
});
