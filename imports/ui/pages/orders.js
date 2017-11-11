import React, { Component } from 'react';
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
