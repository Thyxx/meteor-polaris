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
import handleLogin from '../../../modules/login';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: {
        value: '',
        valid: false,
        focus: false,
      },
      password: {
        value: '',
        valid: false,
        focus: false,
      },
    };
  }

  focusUpdater(field, focus) {
    this.setState({
      [field]: {
        value: this.state[field].value,
        valid: this.state[field].valid,
        focus,
      },
    });
  }

  valueUpdater(field) {
    return (value) => {
      this.setState({
        [field]: {
          value,
          valid: this.state[field].valid,
          focus: this.state[field].focus,
        },
      }, () => {
        this.fieldValidator(field);
      });
    };
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
              focus: this.state[field].focus,
            },
          });
        } else {
          this.setState({
            [field]: {
              valid: false,
              value: this.state[field].value,
              focus: this.state[field].focus,
            },
          });
        }
      });
  }

  formValidator() {
    const { email, password } = this.state;
    return (email.valid && password.valid);
  }

  render() {
    const { email, password } = this.state;
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
                value={email.value}
                label="Email"
                type="email"
                onChange={this.valueUpdater('email')}
                onFocus={() => this.focusUpdater('email', true)}
                onBlur={() => this.focusUpdater('email', false)}
                error={!email.focus && !email.valid && email.value.length > 0 ? 'Use a valid email address.' : false}
              />
              <TextField
                prefix={<Icon color={'inkLightest'} source="search" />}
                value={password.value}
                label="Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('password')}
                onFocus={() => this.focusUpdater('password', true)}
                onBlur={() => this.focusUpdater('password', false)}
                error={!password.focus && !password.valid && password.value.length > 0 ? 'Password must contain at least 6 characters.' : false}
              />
              <Button
                submit
                primary
                disabled={!this.formValidator()}
                onClick={() => handleLogin({ component: this })}
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
