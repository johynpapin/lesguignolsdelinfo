import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './timeline-page.html';
import '../components/comments';

Template.timelinePage.helpers({
	user() {
		return Meteor.user();
	}
});
