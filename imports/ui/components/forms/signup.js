import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Card,
  TextField,
  FormLayout,
  Button,
} from '@shopify/polaris';
import yup from 'yup';
import handleSignup from '../../../modules/signup';

export default class Signup extends Component {
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
      first: {
        value: '',
        valid: false,
        focus: false,
      },
      last: {
        value: '',
        valid: false,
        focus: false,
      },
      confirmPassword: {
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
    } else if (field === 'confirmPassword') {
      schema = yup.string().oneOf([this.state.password.value]);
    } else if (field === 'first' || field === 'last') {
      schema = yup.string().min(1);
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
    const {
      email, password, confirmPassword, first, last,
    } = this.state;
    return (email.valid && password.valid && confirmPassword.valid && first.valid && last.valid);
  }

  render() {
    const {
      email, password, confirmPassword, first, last,
    } = this.state;
    return (
      <div>
        <Layout.Section>
          <Card
            title="Create an account"
            sectioned
            primaryFooterAction={{
              content: 'Already have an account?',
              plain: true,
              onAction: () => this.props.switch(),
            }}
          >
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={this.state.first.value}
                  label="First Name"
                  onChange={this.valueUpdater('first')}
                  onFocus={() => this.focusUpdater('first', true)}
                  onBlur={() => this.focusUpdater('first', false)}
                  error={!first.focus && !first.valid && first.value.length > 0 ? 'First Name is required.' : false}
                />
                <TextField
                  value={this.state.last.value}
                  label="Last Name"
                  onChange={this.valueUpdater('last')}
                  onFocus={() => this.focusUpdater('last', true)}
                  onBlur={() => this.focusUpdater('last', false)}
                  error={!last.focus && !last.valid && last.value.length > 0 ? 'Last Name is required.' : false}
                />
              </FormLayout.Group>
              <TextField
                value={this.state.email.value}
                label="Email"
                type="email"
                onChange={this.valueUpdater('email')}
                onFocus={() => this.focusUpdater('email', true)}
                onBlur={() => this.focusUpdater('email', false)}
                error={!email.focus && !email.valid && email.value.length > 0 ? 'Use a valid email address.' : false}
              />
              <TextField
                value={this.state.password.value}
                label="Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('password')}
                onFocus={() => this.focusUpdater('password', true)}
                onBlur={() => this.focusUpdater('password', false)}
                error={!password.focus && !password.valid && password.value.length > 0 ? 'Password must contain at least 6 characters.' : false}
              />
              <TextField
                value={this.state.confirmPassword.value}
                label="Confirm Password"
                type="password"
                minLength={6}
                onChange={this.valueUpdater('confirmPassword')}
                onFocus={() => this.focusUpdater('confirmPassword', true)}
                onBlur={() => this.focusUpdater('confirmPassword', false)}
                error={!confirmPassword.focus && !confirmPassword.valid && confirmPassword.value.length > 0 ? 'Passwords do not match.' : false}
              />
              <Button
                submit
                primary
                disabled={!this.formValidator()}
                onClick={() => handleSignup({ component: this })}
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

Signup.propTypes = {
  switch: PropTypes.func.isRequired,
};
