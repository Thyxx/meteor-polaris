import React, { Component } from 'react';
import {
  Page,
  Layout,
} from '@shopify/polaris';
import Divider from '../components/divider';
import Signup from '../components/forms/signup';
import Login from '../components/forms/login';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
    };
  }

  switchLogin() {
    this.setState({
      login: !this.state.login,
    });
  }

  renderLogin() {
    return (
      this.state.login
        ? <Login switch={this.switchLogin.bind(this)}/>
        : <Signup switch={this.switchLogin.bind(this)}/>
    );
  }
  render() {
    return (
      <Page
        title="Home"
      >
        <Divider height={20}/>
        <Layout>
          {this.renderLogin()}
        </Layout>
      </Page>
    );
  }
}
