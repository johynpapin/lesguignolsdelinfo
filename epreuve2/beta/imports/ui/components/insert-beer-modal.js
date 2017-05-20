import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { Meteor } from 'meteor/meteor';

import './insert-beer-modal.html';

Template.insertBeerModal.onRendered(() => {
	$('#insert-beer-modal').modal();
});

Template.insertBeerModal.events({
	'click #insert-beer'() {
		Meteor.call('insertBeer', {
			name: $('#b-name').val(),
			vol: $('#b-vol').val(),
			color: $('#b-color').val(),
			brewer: $('#b-brewer').val(),
			aroma: $('#b-aroma').val(),
			history: $('#b-history').val()
		}, (error, result) => {
			if (error) {
				sAlert.error(error)
			} else {
				sAlert.success('La bière a bien été ajoutée.');
			}
		});
	}
})
