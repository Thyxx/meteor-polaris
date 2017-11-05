import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ResourceList,
  ChoiceList,
  TextStyle,
  SettingToggle,
} from '@shopify/polaris';
import { Stores } from '../../api/stores/stores.js';
import StoresListContainer from '../containers/storesListContainer'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      redirectUrl: '',
      alreadyExists: false,
    };
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }

  handleChange(value) {
    this.setState({ storeName: value });
    Meteor.subscribe('Stores', () => {
      const storeExists = Stores.find({ storeName: value}).fetch();
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
    const choiceListItems = [
      {label: 'I accept the Terms of Service', value: 'false'},
      {label: 'I consent to receiving emails', value: 'false2'},
    ];

    return (
      <div>
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
                    error={this.state.alreadyExists ? 'You are already using this store.' : false}
                    connectedRight={
                      <Button
                        primary
                        submit
                        disabled={this.state.storeName && !this.state.alreadyExists ? false : true}
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
      </div>
    );
  }
}

export default Index;
