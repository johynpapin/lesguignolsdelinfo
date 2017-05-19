import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';
import '../../ui/pages/timeline-page';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main-layout', {content: 'home-page'});
  }
});

FlowRouter.route('/timeline', {
  action: function() {
    BlazeLayout.render('main-layout', {content: 'timeline-page'});
  }
});
