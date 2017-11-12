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
      loading: false,
    };
    this.endLoading = this.endLoading.bind(this);
  }

  endLoading() {
    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <Page
        title="Orders"
        primaryAction={{
          content: 'Refresh',
          icon: 'refresh',
          loading: this.state.loading,
          onAction: () => this.setState({ reRender: !this.state.reRender, loading: true }),
        }}
      >
        <Layout>
          <Layout.Section>
            <OrdersListContainer
              loading={this.endLoading}
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
