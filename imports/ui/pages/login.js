import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Layout,
} from '@shopify/polaris';
import Divider from '../components/divider';
import Signup from '../components/forms/signup';
import LoginComponent from '../components/forms/login';

export default class Login extends Component {
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

  handleRedirect(path) {
    this.props.history.push(path);
  }

  renderLogin() {
    return (
      this.state.login
        ? <LoginComponent
          redirect={this.handleRedirect.bind(this)}
          switch={this.switchLogin.bind(this)}
        />
        : <Signup redirect={this.handleRedirect.bind(this)} switch={this.switchLogin.bind(this)}/>
    );
  }
  render() {
    return (
      <Page
        title="Login"
      >
        <Divider height={20}/>
        <Layout>
          {this.renderLogin()}
        </Layout>
      </Page>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};
