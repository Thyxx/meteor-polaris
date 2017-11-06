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
import yup from 'yup';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: {
        value: '',
        valid: true,
      },
      password: {
        value: '',
        valid: true,
      },
    };
  }

  valueUpdater(field) {
    return value => this.setState({
      [field]: {
        value,
        valid: true,
      },
    });
  }

  fieldValidator(field) {
    let schema;
    if (field === 'email') {
      schema = yup.string().email().required();
    } else if (field === 'password') {
      schema = yup.string().min(6);
    }
    schema.isValid(this.state[field].value)
      .then((valid) => {
        if (valid) {
          this.setState({
            [field]: {
              valid: true,
              value: this.state[field].value,
            },
          });
        } else {
          this.setState({
            [field]: {
              valid: false,
              value: this.state[field].value,
            },
          });
        }
      });
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
                value={this.state.email.value}
                label="Email"
                type="email"
                onChange={this.valueUpdater('email')}
                onBlur={() => this.fieldValidator('email')}
                error={!this.state.email.valid && this.state.email.value.length > 0 ? 'Use a valid email address.' : false}
              />
              <TextField
                prefix={<Icon color={'inkLightest'} source="search" />}
                value={this.state.password.value}
                label="Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('password')}
                onBlur={() => this.fieldValidator('password')}
                error={!this.state.password.valid && this.state.password.value.length > 0 ? 'Password must contain at least 6 characters.' : false}
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
