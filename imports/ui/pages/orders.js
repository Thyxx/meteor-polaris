import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Layout,
  EmptyState,
} from '@shopify/polaris';
import OrdersListContainer from '../containers/ordersListContainer';

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      reRender: false,
    };
  }

  renderOrders() {
    if (this.props.stores && this.props.stores.length > 0) {
      return (
        <Page
          title="Orders"
          primaryAction={{
            content: 'Refresh',
            icon: 'refresh',
            onAction: () => {
              this.setState({ reRender: !this.state.reRender });
            },
          }}
        >
          <Layout>
            <Layout.Section>
              <OrdersListContainer
                re-render={this.state.reRender}
                stores={this.props.stores}
              />
            </Layout.Section>
          </Layout>
        </Page>
      );
    }
    return (
      <Page
        title="Orders"
        separator
      >
        <EmptyState
          heading="Connect your stores"
          action={{
            content: 'Connect',
            onAction: () => this.props.history.push('/settings'),
          }}
          image="https://cdn.shopify.com/s/assets/admin/empty-states-fresh/emptystate-products-fa2065ec7520b72d7a7572b5ce4bab1115bc90a4a6d0b609fd68ab67ad823c65.svg"
        >
          <p>You do not have any Shopify store connected yet. You need to add a store from the settings instance to import your orders.</p>
        </EmptyState>
      </Page>
    );
  }

  render() {
    return (
      this.renderOrders()
    );
  }
}

Orders.propTypes = {
  stores: PropTypes.array,
  history: PropTypes.object.isRequired,
};
