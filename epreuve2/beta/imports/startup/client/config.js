import { sAlert } from 'meteor/juliancwirko:s-alert';

Meteor.startup(() => {
	sAlert.config({
		effect: 'stackslide',
    onRouteClose: false
	});

	reCAPTCHA.config({
		publickey: '6LdUNSIUAAAAAHXzuy7rtk3cZgbeuRyrRroqCHbo',
		hl: 'fr'
	});
});
