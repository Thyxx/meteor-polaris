import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {
  Page,
  Layout,
  FooterHelp,
  Link,
  SettingToggle,
  Banner,
} from '@shopify/polaris';

export default class Callback extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      shop: '',
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const code = searchParams.get('code');
    const shop = searchParams.get('shop');
    this.setState({
      code,
      shop,
    });
  }

  toggleConnection() {
    this.setState({
      loading: true,
    });
    Meteor.call('shopify.createShop', this.state.code, this.state.shop, (err) => {
      if (err) {
        console.log(err);
        this.setState({
          loading: false,
          error: true,
        });
      } else {
        this.props.history.push('/orders');
      }
    });
  }

  render() {
    return (
      <Page
        title="Confirmation"
      >
        <Layout>
          <Layout.Section
            title="Style"
            description="Customize the style of your checkout"
          >
            {
              this.state.error ?
              <Banner
                title="Error connecting the store"
                status="critical"
              >
                <p>Go to your store, remove the App and do the process again please. <a target="_blank" href={`https://${this.state.shop}/admin/apps`}>Remove the App</a></p>
              </Banner> : <p></p>
            }
            <SettingToggle
              action={{
                content: 'Connect to Shopify Store',
                onAction: this.toggleConnection.bind(this),
                loading: this.state.loading,
              }}
            >
              Please confirmation the app installation to import your orders.
            </SettingToggle>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

Callback.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
