import { FlowRouter } from 'meteor/kadira:flow-router';

import '../../ui/layouts/main-layout';
import '../../ui/layouts/social-layout';
import '../../ui/pages/home-page';
import '../../ui/pages/timeline-page';
import '../../ui/pages/beers-page';
import '../../ui/pages/mybeers-page';
import '../../ui/pages/beer-page';

FlowRouter.route('/', {
  action: function() {
		if (Meteor.userId()) FlowRouter.go('/timeline');
    BlazeLayout.render('mainLayout', {content: 'homePage'});
  }
});

FlowRouter.route('/timeline', {
  action: function() {
		if (!Meteor.userId()) FlowRouter.go('/');
    BlazeLayout.render('socialLayout', {content: 'timelinePage'});
  }
});

FlowRouter.route('/beers', {
  action: function() {
		if (!Meteor.userId()) FlowRouter.go('/');
    BlazeLayout.render('socialLayout', {content: 'beersPage'});
  }
});

FlowRouter.route('/mybeers', {
  action: function() {
		if (!Meteor.userId()) FlowRouter.go('/');
    BlazeLayout.render('socialLayout', {content: 'mybeersPage'});
  }
});

FlowRouter.route('/beer/:beerId', {
  action: function(param) {
		if (!Meteor.userId()) FlowRouter.go('/');
    BlazeLayout.render('socialLayout', {content: 'beerPage'});
  }
});
