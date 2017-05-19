import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main-layout', {content: 'home-page'});
  }
});
