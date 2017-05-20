import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import '../components/register-form';
import '../components/login-form';
import '../components/social-buttons';

import './home-page.html';

Template.homePage.onRendered(() => {
  const settings = 'particles.json';
  if (particlesJS) {
    console.log(`loading particles.js config from "${settings}"...`)
    particlesJS.load('particles-js', settings, function () {
      console.log('callback - particles.js config loaded');
    });
    }
});

Template.homePage.helpers({
	loginFormIsCurrent() {
		return Session.get('loginForm');
	}
});
