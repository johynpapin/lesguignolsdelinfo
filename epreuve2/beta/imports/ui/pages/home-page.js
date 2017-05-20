import '../components/register-form';
import '../components/social-buttons';

import './home-page.html';

Template.homePage.onRendered(() => {
  const settings = 'particles.json';
  this.autorun(() => {
    if (particlesJS) {
      console.log(`loading particles.js config from "${settings}"...`)

      particlesJS.load('particles-js', settings, function () {
        console.log('callback - particles.js config loaded');
      });
    }
  });
});
