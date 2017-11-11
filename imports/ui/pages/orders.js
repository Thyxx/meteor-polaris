import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Layout,
} from '@shopify/polaris';
import OrdersListContainer from '../containers/ordersListContainer';

export default class Orders extends Component {
  render() {
    return (
      <Page
        title="Orders"
        primaryAction={{ content: 'Refresh', icon: 'refresh', disabled: true }}
      >
        <Layout>
          <Layout.Section>
            <OrdersListContainer stores={this.props.stores}/>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

Orders.propTypes = {
  stores: PropTypes.array,
};
