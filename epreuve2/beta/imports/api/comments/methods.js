import { Meteor } from 'meteor/meteor';

import { Comments } from './comments.js';

Meteor.methods({
	insertComment(comment) {
		return Comments.insert(comment);
	}
});

