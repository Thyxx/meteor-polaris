import React, { Component } from 'react';
import {
  Page,
  Layout,
} from '@shopify/polaris';
import Divider from '../components/divider';

export default class Index extends Component {
  render() {
    return (
      <Page
        title="Home"
      >
        <Divider height={20}/>
        <Layout>
          <h1>Hello World!</h1>
        </Layout>
      </Page>
    );
  }
}
