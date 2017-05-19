import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema';

export const Beers = new Mongo.Collection('beers');

Beers.schema = new SimpleSchema({
	name: {
		type: String,
		label: "Nom",
		max: 200
	},
	vol: {
		type: Number,
		label: "Degré d’alcool",
		min: 0,
		max: 20
	},
	color: {
		type: String,
		label: "Couleur",
		max: 50
	},
	brewer: {
		type: String,
		label: "Brasseur",
		max: 200
	},
	aroma: {
		type: String,
		label: "Arôme",
		max: 200
	},
	history: {
		type: String,
		label: "Histoire",
		max: 3500
	}
});

Beers.attachSchema(Beers.schema);

Beers.publicFields = {
	name: 1,
	vol: 1,
	color: 1,
	brewer: 1,
	aroma: 1,
	history: 1
};

