/* eslint-disable func-names */
import { Meteor } from 'meteor/meteor';
import { Stores } from '../stores.js';

if (Meteor.isServer) {
  Meteor.publish('Stores', function () {
    return Stores.find({ owner: this.userId }, { fields: { token: 0 } });
  });
}
