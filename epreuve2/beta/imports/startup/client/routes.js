import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';
import '../../ui/pages/timeline-page';

FlowRouter.route('/', {
	triggersEnter: [function(context, redirect) {
		if (Meteor.userId()) {
			redirect('/timeline');
		}
	}],
  action: function() {
    BlazeLayout.render('mainLayout', {content: 'homePage'});
  }
});

FlowRouter.route('/timeline', {
  action: function() {
    BlazeLayout.render('mainLayout', {content: 'timelinePage'});
  }
});
