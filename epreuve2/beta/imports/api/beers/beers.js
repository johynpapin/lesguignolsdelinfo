import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'simpl-schema';

export const Beers = new Mongo.Collection('beers');

Beers.schema = new SimpleSchema({
});

Beers.attachSchema(Beers.schema);

Beers.publicFields = {
};
