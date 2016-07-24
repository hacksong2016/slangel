// 对外暴露
var exposed = FlowRouter.group({});

exposed.route('/', {
	name: 'home',
	action: function () {
		BlazeLayout.render('layoutNoWrapper', {content: 'home'});
	}
});

exposed.route('/logout', {
	name: 'logout',
	action: function () {
		Meteor.logout(function(){
			FlowRouter.go('/');
		});
	}
});

exposed.route('/notFound', {
	name: 'notFound',
	action: function () {
		BlazeLayout.render('layout', {content: 'notFound'});
	}
});

exposed.route('/permissionDenied', {
	name: 'permissionDenied',
	action: function () {
		BlazeLayout.render('layout', {content: 'permissionDenied'});
	}
});

exposed.route('/helpMe', {
	name: 'helpMe',
	action: function () {
		BlazeLayout.render('layout', {content: 'helpMe'});
	}
});

exposed.route('/myAppeals', {
	name: 'myAppeals',
	action: function () {
		BlazeLayout.render('layout', {content: 'myAppeals'});
	}
});

exposed.route('/helpMe/:id', {
	name: 'helpmeSingle',
	action: function () {
		BlazeLayout.render('layout', {content: 'helpmeSingle'});
	}
});

exposed.route('/helper', {
	name: 'helper',
	action: function () {
		BlazeLayout.render('layout', {content: 'helper'});
	}
});

exposed.route('/postForHelp', {
	name: 'postForHelp',
	action: function () {
		BlazeLayout.render('layout', {content: 'postForHelp'});
	}
});

exposed.route('/profile', {
	name: 'profileNew',
	action: function () {
		BlazeLayout.render('layout', {content: 'profileNew'});
	}
});

exposed.route('/profile/:id', {
	name: 'profile',
	action: function () {
		BlazeLayout.render('layout', {content: 'profile'});
	}
});

exposed.route('/profile/:id/edit', {
	name: 'profile',
	action: function () {
		BlazeLayout.render('layout', {content: 'profileEdit'});
	}
});

// 需要登录
var loggedIn = FlowRouter.group({
	triggersEnter: [function(context, redirect, stop) {
		if (! (Meteor.userId() || Meteor.loggingIn()) ) {
			var route = FlowRouter.current();
			if(route.route.name !== 'login'){
				Session.set('redirectAfterLogin', route.path);
			}
			FlowRouter.go('login');
			stop();
		}
	}]
});

// 需要work权限
var work = loggedIn.group({
	triggersEnter: [function(context, redirect, stop) {
		waitForRoles(function(){
			if(! Roles.userIsInRole(Meteor.user(), ['admin','work'])){
				FlowRouter.go('permissionDenied');
				stop();
			}
        })
	}]
});

work.route('/work', {
	name: 'work',
	action: function () {
		BlazeLayout.render('layout', {content: 'work'});
	}
});

// wait Roles
function waitForRoles(callback) {
    if (!Roles.subscription.ready()) {
        Meteor.setTimeout(function(){
             waitForRoles()
        }, 100);
    } else {
    	if (callback){
	        callback();
    	}
    }
}

// FlowRouter.route('/', {
//     action: function(params) {
        // waitForRoles(function(){
        //     // do stuff with Roles
        // })
//     }
// });
