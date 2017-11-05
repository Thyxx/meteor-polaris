import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Layout,
  Card,
  ResourceList,
  Spinner,
} from '@shopify/polaris';

export default class StoresList extends Component {
  constructor() {
    super();
    this.state = {
      defaultItem: [
        {
          attributeOne: 'You do not have a store connected yet.',
        }
      ],
    };
  }

  storesList(stores) {
    const storesList = [];
    stores.map((store) => {
      storesList.push(
        {
          attributeOne: store.storeUrl,
          actions: [{
            content: 'Remove',
            onAction: () => this.handleRemove(store._id),
          }],
          persistActions: true,
          badges: [{content: 'Running', status: 'success'}],
        }
      );
    });
    return storesList;
  }

  handleRemove (id) {
    Meteor.call('shopify.removeShop', id);
    // TODO: Redirect the user to his Shop to delete the App
  }

  renderStoresList() {
    return (
      this.props.loading
      ? <Spinner size="small" />
      : <ResourceList
          items={
            this.props.stores.length > 0
            ? this.storesList(this.props.stores)
            : this.state.defaultItem
          }
          renderItem={(item, index) => {
            return <ResourceList.Item key={index} {...item} />;
          }}
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
          sectioned={this.props.loading ? true : false}
        >
          {this.renderStoresList()}
        </Card>
      </Layout.AnnotatedSection>
    );
  }
}
