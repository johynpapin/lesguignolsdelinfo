import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';
import '../../ui/pages/timeline-page';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('mainLayout', {content: 'homePage'});
  }
});

FlowRouter.route('/timeline', {
  action: function() {
    BlazeLayout.render('mainLayout', {content: 'timelinePage'});
  }
});
