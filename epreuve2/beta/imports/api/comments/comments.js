import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Beers } from '../beers/beers';

export const Comments = new Mongo.Collection('commments');

Comments.schema = new SimpleSchema({
	date: {
		type: Date,
		label: "Date"
	},
	content: {
		type: String,
		label: "Contenu",
		max: 5000
	},
	on: {
		type: SimpleSchema.oneOf(Beers, Comments),
		label: "Cible"
	},
	user: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		label: "Auteur"
	}
});

Comments.attachSchema(Comments.schema);

Comments.publicFields = {
	date: 1,
	content: 1,
	on: 1,
	user: 1
};
