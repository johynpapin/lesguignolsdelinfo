import { Template } from 'meteor/templating';

import './register-form.html';

Template.registerForm.helpers({
	nextDisabled() {
		return true;
	}
});

Template.registerForm.events({
	'change input'(e) {
		const firstName = $('#r-first-name').val();
		const lastName = $('#r-last-name').val();
		const email = $('#r-email').val();
	}
});
