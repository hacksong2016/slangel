Meteor.publish("userData", function() {
    check(arguments, [Match.Any]);
    if (this.userId) {
        return [
            Users.find({
                _id: this.userId
            }),
            Profiles.find({
                userId: this.userId
            })
        ];
    }
    this.ready();
});

Meteor.publish("appeals", function(selector, option){
  return Appeals.find(selector, option);
});

Meteor.publish("profiles", function(selector, option){
  return Profiles.find(selector, option);
});

Meteor.publishComposite('helps', {
    find: function(appealId) {
        return Helps.find({
            appealId: appealId
        });
    },
    children: [{
        find: function(appeal) {
            return Profiles.find({
                userId: appeal.helperId
            }, {
                fields: {
                    userName: true,
                    location: true
                }
            });
        }
    }]
});
