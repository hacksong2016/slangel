Profiles = new Mongo.Collection("helpers");

Profiles.attachSchema(
  new SimpleSchema({
    userId: {
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
    userName: {
      type: String,
      label: "用户名",
      autoValue: function() {
        if (this.isInsert) {
          return getUserName(Meteor.user());
        } else if (this.isUpsert) {
          return {
            $setOnInsert: getUserName(Meteor.user())
          };
        } else {
          this.unset();
        }
      }
    },
    customImageUrl: {
      type: String,
      optional: true
    },
    name: {
      type: String,
      label: "姓名",
      max: 128
    },
    type: {
      type: String,
      label: "组织或个人",
      allowedValues: ["组织", "个人"]
    },
    title: {
      type: String,
      label: "您所擅长提供的帮助",
      max: 128
    },
    location: {
      type: String,
      label: "所在城市",
      max: 256
    },
    description: {
      type: String,
      label: "介绍一下自己吧",
      max: 10000,
      autoform: {
        afFieldInput: SUMMERNOTE_OPTIONS
      }
    },
    // Automatically set HTML content based on markdown content
    // whenever the markdown content is set.
    htmlDescription: {
      type: String,
      optional: true,
      autoValue: function(doc) {
        var htmlContent = this.field("description");
        if (Meteor.isServer && htmlContent.isSet) {
          return cleanHtml(htmlContent.value);
        }
      }
    },
    availableForHire: {
      type: Boolean,
      label: "现在可以提供帮助吗",
      defaultValue: false
    },
    interestedIn: {
      type: [String],
      label: "可提供哪些方面帮助",
      allowedValues: HELP_TYPES,
      optional: true
    },
    contact: {
      type: String,
      label: "联系方式",
      max: 1024,
      optional: true
    },
    url: {
      type: String,
      label: "网站",
      max: 1024,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    status: {
      type: String,
      allowedValues: PROFILE_STATUSES,
      defaultValue:"active"
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

Profiles.helpers({
  displayName: function() {
    return this.name || this.userName;
  },
  path: function() {
    return 'profiles/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.displayName() + ' ' + this.title);
  }
});

Profiles.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) || (!_.contains(fieldNames, 'randomSorter') && !_.contains(fieldNames, 'htmlDescription') && !_.contains(fieldNames, 'status') && userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']) || (userId && doc && userId === doc.userId);
  },
  fetch: ['userId']
});
