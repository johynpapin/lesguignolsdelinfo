import { Gravatar } from 'meteor/jparker:gravatar';

import './social-layout.html';

Template.socialLayout.onRendered(() => {
	$(".button-collapse").sideNav();
});

Template.socialLayout.helpers({
	avatarUrl() {
		if (Meteor.user())
			return Gravatar.imageUrl(Meteor.user().emails[0].address);
	},
	fullName() {
		if (Meteor.user())
			return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
	},
	email() {
		if (Meteor.user())
			return Meteor.user().emails[0].address;
	}
});

Template.socialLayout.events({
	'click #logout'() {
		Meteor.logout(() => {
			FlowRouter.go('/');
		});
	}
});
