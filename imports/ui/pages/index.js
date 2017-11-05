import React, { Component } from 'react';
import {
  Layout,
} from '@shopify/polaris';
import Divider from '../components/divider';
import Signup from '../components/signup';
import Login from '../components/login';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
    };
  }

  renderLogin() {
    return this.state.login ? <Login/> : <Signup/>;
  }
  render() {
    return (
      <div>
        <Divider height={20}/>
        <Layout>
          {this.renderLogin()}
          <div>
            <Layout.Section>
              <h1 onClick={() => this.setState({ login: !this.state.login })}>switch</h1>
            </Layout.Section>
          </div>
        </Layout>
      </div>
    );
  }
}
