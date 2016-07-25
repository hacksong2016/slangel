Meteor.publish("appeals", function(selector, option){
  return Appeals.find(selector, option);
});

Meteor.publish("profiles", function(selector, option){
  return Profiles.find(selector, option);
});
