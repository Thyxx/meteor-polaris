import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Stores } from '../../api/stores/stores';
import StoresList from '../components/storesList';

export default StoresListContainer = withTracker(() => {
  const storesHandle = Meteor.subscribe('Stores');
  const loading = !storesHandle.ready();
  const stores = Stores.find().fetch();
  const storesExists = !loading && !!stores;
  return {
    loading,
    stores,
    storesExists,
  };
})(StoresList);
