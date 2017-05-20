import { Template } from 'meteor/templating';

import { Beers } from '/imports/api/beers/beers';

import '../components/insert-beer-modal';
import '../components/beer';

import './mybeers-page.html';


Template.mybeersPage.helpers({
	beers() {
		return Beers.find({_id: {
			$in: Meteor.user().profile.beers
		}});
	}
})
