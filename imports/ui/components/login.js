import React, { Component } from 'react';
import {
  Layout,
  Card,
  TextField,
  FormLayout,
  Button,
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
          >
            <FormLayout>
              <TextField
                value={this.state.email}
                label="Email"
                type="email"
                onChange={this.valueUpdater('email')}
              />
              <TextField
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
