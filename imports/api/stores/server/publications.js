import { Meteor } from 'meteor/meteor';
import { Stores } from '../stores.js';

if (Meteor.isServer) {
  Meteor.publish('Stores', () => Stores.find());
}
