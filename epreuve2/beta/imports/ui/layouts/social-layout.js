import { Gravatar } from 'meteor/jparker:gravatar';

import './social-layout.html';

Template.socialLayout.helpers({
	avatarUrl() {
		return Gravatar.imageUrl(Meteor.user().emails[0].address);
	},
	fullName() {
		return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
	},
	email() {
		return Meteor.user().emails[0].address;
	}
})
