import './main-layout.html';

Template.mainLayout.onRendered(function() {
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
