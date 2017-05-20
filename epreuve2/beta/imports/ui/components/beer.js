import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { Meteor } from 'meteor/meteor';

import './beer.html';

Template.beer.events({
	'click .like-beer'(e) {
		Meteor.call('likeBeer', this._id, (error, result) => {
			if (error) {
				sAlert.error(error);
			} else {
				sAlert.success('Votre choix a bien été pris en compte.');
			}
		});
	}
})
