import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import './register-form.html';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Template.registerForm.onRendered(() => {
	Session.set('nextEnabled', false);
	Session.set('partTwo', false);
	Session.set('registerEnabled', false);
});

Template.registerForm.helpers({
	nextEnabled() {
		return Session.get('nextEnabled');
	},
	partTwo() {
		return Session.get('partTwo');
	},
	registerEnabled() {
		return Session.get('registerEnabled');
	}
});

Template.registerForm.events({
	'input input'(e) {
		const username = $('#r-username');
		const firstName = $('#r-first-name');
		const lastName = $('#r-last-name');
		const email = $('#r-email');

		Session.set('nextEnabled', username.val() !== '' && firstName.val() !== '' && lastName.val() != '' && validateEmail(email.val()));

		const password = $('#r-password');
		const password2 = $('#r-password-2');

		Session.set('registerEnabled', Session.get('nextEnabled') && password.val() != '' && password.val() === password2.val());
	},
	'click #r-next'(e) {
		Session.set('partTwo', true);
	},
	'submit #register-form'(e) {
		e.preventDefault();

		const username = $('#r-username');
		const firstName = $('#r-first-name');
		const lastName = $('#r-last-name');
		const email = $('#r-email');
		const password = $('#r-password');
		const password2 = $('#r-password-2');

		if (username.val() !== '' && firstName.val() !== '' && lastName.val() !== '' && validateEmail(email.val()) && password.val() !== '' && password.val() === password2.val()) {
			Accounts.createUser({
				username: username.val(),
				email: email.val(),
				password: password.val(),
				profile: {
					firstName: firstName.val(),
					lastName: lastName.val()
				}
			}, error => {
				if (error) {
					sAlert.error(error);
				} else {
					sAlert.success('Bienvenue, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + ' !');
				}
			});
		} else {
			sAlert.warning('Le formulaire d’inscription est invalide.');
		}
	}
});
