Template.helpItem.helpers({
  canOperation: function(){
    if(this.appealsUserId == Meteor.userId()) {
      return true;
    }
    return false;
  },
  status: function(){
    if(this.status == 'success') {
      return {
        style: 'text-success',
        text: '成功帮助'
      }
    }
    if(this.status == 'pending') {
      return {
        style: 'text-warning',
        text: '等待接受'
      }
    }
    if(this.status == 'refused') {
      return {
        style: 'text-danger',
        text: '已被拒绝'
      }
    }
    if(this.status == 'accepted') {
      return {
        style: 'text-info',
        text: '接受帮助'
      }
    }
  }
});

Template.helpItem.events({
  'click [name=accept]': function(event, template){
    Meteor.call('helpStatus', this._id, 'accepted');
  },
  'click [name=refuse]': function(event, template){
    Meteor.call('helpStatus', this._id, 'refused');
  }
});
