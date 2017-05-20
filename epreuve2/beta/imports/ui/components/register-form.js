import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './register-form.html';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Template.registerForm.helpers({
	nextEnabled() {
		return Session.get('nextEnabled');
	}
});

Template.registerForm.events({
	'input input'(e) {
		console.log(Session.get('nextEnabled'));
		const firstName = $('#r-first-name');
		const lastName = $('#r-last-name');
		const email = $('#r-email');

		Session.set('nextEnabled', firstName.val().length !== 0 && lastName.val().length !== 0 && validateEmail(email.val()));
	}
});
