import { Template } from 'meteor/templating';

import { Beers } from '/imports/api/beers/beers';

import '../components/insert-beer-modal';
import '../components/beer';

import './beers-page.html';


Template.beersPage.helpers({
	beers() {
		return Beers.find({});
	}
})
