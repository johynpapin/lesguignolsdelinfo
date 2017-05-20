import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import './login-form.html';

Template.loginForm.onRendered(() => {
	Session.set('loginEnabled', false);
});

Template.loginForm.helpers({
	loginEnabled() {
		return Session.get('loginEnabled');
	}
});

Template.loginForm.events({
	'input input'(e) {
		const usernameEmail = $('#l-username-email');
		const password = $('#l-password');

		Session.set('loginEnabled', usernameEmail.val() !== '' && password.val() !== '');
	},
	'submit #login-form'(e) {
		e.preventDefault();

		const usernameEmail = $('#l-username-email');
		const password = $('#l-password');

		if (usernameEmail.val() !== '' && password.val() !== '') {
			Meteor.loginWithPassword(usernameEmail.val(), password.val(), error => {
				if (error) {
					sAlert.error(error);
				} else {
					sAlert.success('Bonjour, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + '.');
				}
			});
		} else {
			sAlert.warning('Le formulaire d’inscription est invalide.');
		}
	},
	'click #l-register'(e) {
		Session.set('loginForm', false);
	}
});
