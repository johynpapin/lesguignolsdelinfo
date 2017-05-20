import { Meteor } from 'meteor/meteor';

import { Comments } from '../comments.js';

Meteor.publish('comments', function comments() {
  return Comments.find({}, {
    fields: Comments.publicFields,
  });
});

