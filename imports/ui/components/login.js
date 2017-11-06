import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Card,
  TextField,
  FormLayout,
  Button,
  Icon,
} from '@shopify/polaris';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  valueUpdater(field) {
    return value => this.setState({ [field]: value });
  }

  render() {
    return (
      <div>
        <Layout.Section>
          <Card
            title="Sign in"
            sectioned
            primaryFooterAction={{
              content: 'Create an account',
              plain: true,
              onAction: () => this.props.switch(),
            }}
          >
            <FormLayout>
              <div style={{ width: '460px' }}></div>
              <TextField
                prefix={<Icon color={'inkLightest'} source="circlePlus" />}
                value={this.state.email}
                label="Email"
                type="email"
                onChange={this.valueUpdater('email')}
              />
              <TextField
                prefix={<Icon color={'inkLightest'} source="search" />}
                value={this.state.password}
                label="Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('password')}
              />
              <Button
                submit
                primary
                disabled
              >
                Sign in
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>
      </div>
    );
  }
}

Login.propTypes = {
  switch: PropTypes.func.isRequired,
};
