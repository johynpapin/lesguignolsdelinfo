import { sAlert } from 'meteor/juliancwirko:s-alert';

Meteor.startup(() => {
	sAlert.config({
		effect: 'stackslide',
    onRouteClose: false
	});
});
