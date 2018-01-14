import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import Orders from '../pages/orders';

const OrdersContainer = withTracker(() => {
  Meteor.call('shopify.getStoresId', (err, res) => {
    Session.set('stores', res);
  });
  return {
    stores: Session.get('stores'),
  };
})(Orders);

export default OrdersContainer;
