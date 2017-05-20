import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './timeline-page.html';
import '../components/comment';

Template.timelinePage.helpers({
	user() {
		return Meteor.user();
	}
});
