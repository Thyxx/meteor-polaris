import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Page,
  Layout,
  Card,
  Button,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import { Stores } from '../../api/stores/stores.js';
import StoresListContainer from '../containers/storesListContainer';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      redirectUrl: '',
      alreadyExists: false,
    };
  }

  handleChange(value) {
    this.setState({ storeName: value });
    Meteor.subscribe('Stores', () => {
      const storeExists = Stores.find({ storeName: value }).fetch();
      if (storeExists.length > 0) {
        this.setState({
          alreadyExists: true,
        });
      } else {
        this.setState({
          alreadyExists: false,
        });
      }
    });
    Meteor.call('shopify.getRedirectUrl', value, (err, res) => {
      this.setState({ redirectUrl: res });
    });
  }

  handleConnect() {
    window.open(this.state.redirectUrl, '_self');
    this.setState({
      storeName: '',
    });
  }

  render() {
    return (
      <Page
        title="Settings"
        separator
      >
        <Layout>
          <Layout.AnnotatedSection
            title="Connect your Shopify Store"
            description="To use the aplication, you need to add your Shopify stores."
          >
            <Card
              title="Add a store"
              sectioned
            >
              <FormLayout>
                <FormLayout.Group condensed>
                  <TextField
                    value={this.state.storeName}
                    placeholder="my-store"
                    prefix="https://"
                    suffix=".myshopify.com"
                    onChange={this.handleChange.bind(this)}
                    error={this.state.alreadyExists ? 'This store already exists, please contact the store owner.' : false}
                    connectedRight={
                      <Button
                        primary
                        submit
                        disabled={!(this.state.storeName && !this.state.alreadyExists)}
                        onClick={this.handleConnect.bind(this)}
                      >
                        Connect
                      </Button>
                    }
                  />
                </FormLayout.Group>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <StoresListContainer/>
        </Layout>
      </Page>
    );
  }
}
