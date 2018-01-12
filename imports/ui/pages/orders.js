import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Layout,
} from '@shopify/polaris';
import OrdersListContainer from '../containers/ordersListContainer';

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      reRender: false,
    };
  }

  render() {
    console.log('render page');
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
}

Orders.propTypes = {
  stores: PropTypes.array,
};
