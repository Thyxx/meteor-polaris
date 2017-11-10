import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {
  Layout,
  Card,
  ResourceList,
  Spinner,
} from '@shopify/polaris';

class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      status: 'success',
      badgeMessage: 'Running',
      redirectUrl: '',
    };
  }

  handleRemove(id) {
    Meteor.call('shopify.removeShop', id);
  }

  componentWillMount() {
    Meteor.call('shopify.getRedirectUrl', this.props.storeName, (err, res) => {
      this.setState({ redirectUrl: res });
    });
  }

  componentDidMount() {
    Meteor.call('shopify.isTokenActive', this.props._id, (err, res) => {
      if (!res) {
        this.setState({
          status: 'warning',
          badgeMessage: 'Not connected',
        });
      }
    });
  }

  render() {
    return (
      <ResourceList.Item
        attributeOne={this.props.storeUrl}
        actions={[{
          content: 'Update',
          onAction: () => window.open(this.state.redirectUrl, '_self'),
        },
        {
          content: 'Remove',
          onAction: () => this.handleRemove(this.props._id),
        }]}
        persistActions={true}
        badges={[{ content: this.state.badgeMessage, status: this.state.status }]}
      />
    );
  }
}

ListItem.propTypes = {
  storeUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
};

export default class StoresList extends Component {
  renderStoresList() {
    const { stores } = this.props;
    return (
      stores.length > 0
        ? <ResourceList
            items={stores}
            renderItem={(item, index) =>
              <ListItem key={index} {...item} />
            }
        />
        : <ResourceList
            items={[{ attributeOne: 'You do not have a store connected yet.' }]}
            renderItem={(item, index) =>
              <ResourceList.Item key={index} {...item} />
            }
        />
    );
  }

  render() {
    return (
      <Layout.AnnotatedSection
        title="Manage your connected Stores"
        description="Here you can manage your connected stores."
      >
        <Card
          title="List of Stores"
          sectioned={!!this.props.loading}
        >
          {this.renderStoresList()}
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}

StoresList.propTypes = {
  loading: PropTypes.bool.isRequired,
  stores: PropTypes.array.isRequired,
};
