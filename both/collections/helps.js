Helps = new Meteor.Collection("helps");

Helps.attachSchema(
  new SimpleSchema({
    appealsId: {
      type: String
    },
    appealsUserId: {
      type: String
    },
    helperId: {
      type: String,
      autoValue: function() {
        if (this.isInsert) {
          return Meteor.userId();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: Meteor.userId()
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    helperName: {
      type: String,
      optional: true
    },
    helperLocation: {
      type: String,
      optional: true
    },
    description: {
      type: String,
      label: "我要帮助他",
      max: 20000,
      autoform: {
        type: "textarea"
      }
    },
    status: {
      type: String,
      allowedValues: HELP_STATUSES,
      defaultValue: "pending"
    },
    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: new Date()
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    }
  })
);

Helps.helpers({

});

Helps.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.helperId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) || (!_.contains(fieldNames, 'status') && userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
