import React, { Component } from 'react';
import {
  Layout,
  Card,
  TextField,
  FormLayout,
  Button,
} from '@shopify/polaris';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: '',
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
            title="Sign Up"
            sectioned
          >
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={this.state.first}
                  label="First Name"
                  onChange={this.valueUpdater('first')}
                />
                <TextField
                  value={this.state.last}
                  label="Last Name"
                  onChange={this.valueUpdater('last')}
                />
              </FormLayout.Group>
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
              <TextField
                value={this.state.confirmPassword}
                label="Confirm Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('confirmPassword')}
              />
              <Button
                submit
                primary
                disabled
              >
                Sign Up
              </Button>
            </FormLayout>
          </Card>
        </Layout.Section>
      </div>
    );
  }
}
