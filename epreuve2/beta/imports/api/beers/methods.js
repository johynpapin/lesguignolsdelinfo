import { Meteor } from 'meteor/meteor';

import { Beers } from './beers.js';

Meteor.methods({
	insertBeer(beer) {
		return Beers.insert(beer);
	},
	likeBeer(beerId) {
		Meteor.users.update(Meteor.userId(), {
			$addToSet: {
				'profile.beers': beerId
			}
		});
	}
});
