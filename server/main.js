import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // 初始化cell
  faker.locale = 'zh_CN';
  if(Appeals.find().count() < 50){
  	_.each(_.range(50), function(){
      Appeals.insert({
        title : faker.internet.userName(),
        location : faker.address.city(),
        url : faker.internet.url(),
        contact : faker.phone.phoneNumber(),
        appealtype : faker.random.arrayElement(HELP_TYPES),
        userId : faker.random.uuid(),
        userName : faker.internet.userName(),
        description : faker.lorem.paragraph(),
        status : 'pending',
        userName : faker.internet.userName(),
        createdAt : new Date()
      });
  	});
  }

  if(Profiles.find().count() < 50){
  	_.each(_.range(50), function(){
      Profiles.insert({
        userId : faker.random.uuid(),
        userName : faker.internet.userName(),
        customImageUrl : faker.internet.url(),
        name : faker.internet.userName(),
        type : faker.random.arrayElement(['组织', '个人']),
        title : faker.internet.userName(),
        location : faker.address.city(),
        description : faker.lorem.paragraph(),
        availableForHire : true,
        interestedIn : [faker.random.arrayElement(HELP_TYPES)],
        contact : faker.phone.phoneNumber(),
        createdAt : new Date()
      });
  	});
  }
});
