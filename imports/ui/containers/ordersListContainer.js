import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import _ from 'underscore';
import OrdersList from '../components/ordersList';

const page = new ReactiveVar(1);
const changePage = (increment) => {
  if (increment) {
    page.set(page.get() + 1);
  } else {
    page.set(page.get() - 1);
  }
};

const searchValue = new ReactiveVar('');
const handleSearch = (value) => {
  searchValue.set(value);
};

Session.set('filters', {
  status: 'any',
  financial_status: 'any',
});
const filters = Session.get('filters');
const updateFilters = (filter) => {
  Session.set('filters', _.extend(filters, { [filter.filter]: filter.value }));
};

const OrdersListContainer = withTracker((props) => {
  Meteor.call('shopify.getOrders', page.get(), searchValue.get(), Session.get('filters'), (err, res) => {
    Session.set('orders', res);
  });

  return {
    orders: Session.get('orders'),
    loading: !Session.get('orders'),
    changePage,
    handleSearch,
    updateFilters,
    page: page.get(),
    stores: props.stores,
  };
})(OrdersList);

export default OrdersListContainer;
