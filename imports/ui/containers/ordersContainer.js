import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import Orders from '../pages/orders';

const OrdersContainer = withTracker(() => {
  const stores = Session.get('stores');
  Meteor.call('shopify.getStoresId', (err, res) => {
    Session.set('stores', res);
  });
  const loading = !stores;
  const ordersExists = !loading && !!stores;
  return {
    stores,
    loading,
    ordersExists,
  };
})(Orders);

export default OrdersContainer;
