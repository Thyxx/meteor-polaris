/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ResourceList,
  TextStyle,
} from '@shopify/polaris';

export default class ListItem extends Component {
  constructor() {
    super();
    this.renderOrderUrl = this.renderOrderUrl.bind(this);
  }

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderOrderUrl(storeUrl, orderId) {
    if (!storeUrl) {
      return '#';
    }
    const url = new URL(storeUrl);
    const { protocol, pathname } = url;
    const storeId = pathname.split('/')[1];
    const { stores } = this.props;
    const index = stores.findIndex(i => i.id === Number(storeId));
    const store = stores[index];
    return `${protocol}//${store.url}/admin/orders/${orderId}`;
  }

  render() {
    const {
      id, customer, financial_status, fulfillment_status, created_at, name, order_status_url,
    } = this.props;
    return (
      <ResourceList.Item
        actions={[{
          content: 'View order details',
          onAction: () => window.open(this.renderOrderUrl(order_status_url, id)),
        }]}
        persistActions
        external
        attributeOne={name}
        attributeTwo={customer ? `${customer.first_name} ${customer.last_name}` : ''}
        attributeThree={
          <TextStyle variation="subdued">{moment(created_at).calendar()}</TextStyle>
        }
        badges={[
          {
            content: this.jsUcfirst(financial_status),
            status: financial_status === 'authorized' || financial_status === 'pending' ? 'attention' : 'default',
          },
          {
            content: !fulfillment_status ? 'Unfulfilled' : this.jsUcfirst(fulfillment_status),
            status: !fulfillment_status ? 'attention' : 'default',
            progress: 'incomplete',
          },
        ]}
      />
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  created_at: PropTypes.string,
  fulfillment_status: PropTypes.string,
  financial_status: PropTypes.string,
  customer: PropTypes.object,
  order_status_url: PropTypes.string,
  stores: PropTypes.array,
};
