import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './login-form.html';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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
		const password = $('#r-password');

		Session.set('loginEnabled', usernameEmail.val().length !== 0 && password.val().length !== 0);
	},
	'click #r-next'(e) {
		Session.set('partTwo', true);
	},
	'submit #login-form'(e) {
		const usernameEmail = $('#l-username-email');
		const password = $('#r-password');

		if (firstName.val().length !== 0 && lastName.val().length !== 0) {
			//here do effective connection
		} else {
			sAlert.warning('Le formulaire d’inscription est invalide.');
		}
	}
});

