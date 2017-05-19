import { Meteor } from 'meteor/meteor';

import { Beers } from '../beers.js';

Meteor.publish('beers', function beers() {
  return Beers.find({}, {
    fields: Beers.publicFields,
  });
});
