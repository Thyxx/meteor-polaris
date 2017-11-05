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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      redirectUrl: '',
      alreadyExists: false,
      items: [
        {
          attributeOne: 'You do not have a store connected yet.',
        }
      ],
    };
  }

  componentWillMount() {
    // TODO: Add a method to check if the token is valid or not
    Meteor.subscribe('Stores', () => {
      const stores = Stores.find().fetch();
      const array = [];
      stores.map((store) => {
        array.push(
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
      if (array.length > 0) {
        this.setState({
          items: array,
        });
      }
    });
  }

  handleRemove (id) {
    Meteor.call('shopify.removeShop', id);
    // TODO: Redirect the user to his Shop to delete the App
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
              title="Store Name"
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
          <Layout.AnnotatedSection
            title="Manage your connected Stores"
            description="Here you can manage your connected stores."
          >
            <Card
              title="List of Stores"
            >
              <ResourceList
                items={this.state.items}
                renderItem={(item, index) => {
                  return <ResourceList.Item key={index} {...item} />;
                }}
              />
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }

  connectAccountMarkup() {
    return (
      <Layout.AnnotatedSection
        title="Account"
        description="Connect your account to your Shopify store."
      >
        <AccountConnection
          action={{
            content: 'Connect',
            onAction: this.toggleConnection.bind(this, this.state),
          }}
          details="No account connected"
          termsOfService={<p>By clicking Connect, you are accepting Sample’s <Link url="https://polaris.shopify.com">Terms and Conditions</Link>, including a commission rate of 15% on sales.</p>}
        />
      </Layout.AnnotatedSection>
    );
  }

  disconnectAccountMarkup() {
    return (
      <Layout.AnnotatedSection
          title="Account"
          description="Disconnect your account from your Shopify store."
        >
        <AccountConnection
          connected
          action={{
            content: 'Disconnect',
            onAction: this.toggleConnection.bind(this, this.state),
          }}
          accountName="Tom Ford"
          title={<Link url="http://google.com">Tom Ford</Link>}
          details="Account id: d587647ae4"
        />
      </Layout.AnnotatedSection>
    );
  }

  renderAccount() {
    return this.state.connected
      ? this.disconnectAccountMarkup()
      : this.connectAccountMarkup();
  }
}

export default Index;
