Appeals = new Mongo.Collection("appeals");

Appeals.attachSchema(
  new SimpleSchema({
    title: {
      type: String,
      label: "标题",
      max: 128
    },
    location: {
      type: String,
      label: "地址",
      max: 128,
      optional: true
    },
    url: {
      type: String,
      label: "网站",
      max: 256,
      optional: true,
      regEx: SimpleSchema.RegEx.Url
    },
    contact: {
      type: String,
      label: "联系方式",
      max: 128
    },
    appealtype: {
      type: String,
      label: "求助类型",
      allowedValues: HELP_TYPES
    },
    userId: {
      type: String,
      label: "User Id",
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
      label: "User Name",
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
    description: {
      type: String,
      label: "详细描述",
      max: 2000000,
      autoform: {
        afFieldInput: SUMMERNOTE_OPTIONS
      }
    },
    status: {
      type: String,
      allowedValues: STATUSES,
      autoValue: function() {
        if (this.isInsert) {
          return 'pending';
        } else if (this.isUpsert) {
          return {
            $setOnInsert: 'pending'
          };
        }
      },
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

Appeals.helpers({
  path: function() {
    return 'appeals/' + this._id + '/' + this.slug();
  },
  slug: function() {
    return getSlug(this.title);
  },
  featured: function() {
    return this.featuredThrough && moment().isBefore(this.featuredThrough);
  },
  featuredAllowed: function() {
    return this.status === "pending" || this.status === "active";
  }
});

Appeals.allow({
  insert: function(userId, doc) {
    return userId && doc && userId === doc.userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']) ||
    (!_.contains(fieldNames, 'htmlDescription')
      && !_.contains(fieldNames, 'status')
        && !_.contains(fieldNames, 'featuredThrough')
          && !_.contains(fieldNames, 'featuredChargeHistory')
          && /*doc.status === "pending" &&*/ userId && doc && userId === doc.userId);
  },
  remove: function(userId, doc) {
    return false;
  },
  fetch: ['userId', 'status']
});
