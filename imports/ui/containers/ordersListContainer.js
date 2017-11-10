import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import OrdersList from '../components/ordersList';

const page = new ReactiveVar(1);
const changePage = (increment) => {
  if (increment) {
    page.set(page.get() + 1);
  } else {
    page.set(page.get() - 1);
  }
};

const OrdersListContainer = withTracker(() => {
  const orders = Session.get('orders');
  Meteor.call('shopify.getOrders', page.get(), (err, res) => {
    Session.set('orders', res);
  });
  const loading = !orders;
  const ordersExists = !loading && !!orders;
  return {
    orders,
    loading,
    ordersExists,
    changePage,
    page: page.get(),
  };
})(OrdersList);

export default OrdersListContainer;
