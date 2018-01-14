import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Page,
  EmptyState,
} from '@shopify/polaris';

export default class Index extends Component {
  render() {
    return (
      !this.props.authenticated
        ? <Page
        title="Home"
        separator
        >
        <EmptyState
          heading="Manage all your stores"
          action={{
            content: 'Create an account',
            onAction: () => this.props.history.push('/login'),
          }}
          secondaryAction={{
            content: 'Log in',
            onAction: () => this.props.history.push('/login'),
          }}
          image="https://cdn.shopify.com/s/assets/admin/empty-states-fresh/orders-d51d6203328a3554667b97f194a687e93a5d5a94dbb6406dce81219afab4625f.svg"
        >
          <p>Import your orders from multiple Shopify stores and manage it from the same place.</p>
        </EmptyState>
      </Page>
        : <Redirect to="/orders"/>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
