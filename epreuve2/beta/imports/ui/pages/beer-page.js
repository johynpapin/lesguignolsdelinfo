import { Template } from 'meteor/templating';

import { Beers } from '/imports/api/beers/beers';
import { Comments } from '/imports/api/comments/comments';

import '../components/beer';
import './beer-page.html';

Template.beersPage.helpers({
	comments() {
		return Comments.find({on: beer});
	}
});

