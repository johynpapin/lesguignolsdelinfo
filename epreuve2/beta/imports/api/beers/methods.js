import { Meteor } from 'meteor/meteor';

import { Beers } from './beers.js';

Meteor.methods({
	insertBeer(beer) {
		return Beers.insert(beer);
	}
});
