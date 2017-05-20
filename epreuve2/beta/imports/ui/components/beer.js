import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './beer.html';

Template.beer.events({
	'click .like-beer'(e) {
		Meteor.call('likeBeer', this._id);
	},
	'click .unlike-beer'(e) {
		Meteor.call('unlikeBeer', this._id);
	}
})

Template.beer.helpers({
	liked() {
		//return Meteor.user().profile.beers.indexOf(this._id) !== -1;
	}
});
