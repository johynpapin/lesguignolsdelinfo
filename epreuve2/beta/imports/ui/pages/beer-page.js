import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Beers } from '/imports/api/beers/beers';
import { Comments } from '/imports/api/comments/comments';

import '../components/beer';
import '../components/comment';
import './beer-page.html';

Template.beerPage.helpers({
	b() {
		return Beers.findOne(FlowRouter.getParam('beerId'));
	},
	comments() {
		return Comments.find({on: beer});
	}
});
