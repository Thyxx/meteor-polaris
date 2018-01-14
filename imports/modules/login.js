/* eslint-disable prefer-destructuring */
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default function handleSignup(options) {
  const component = options.component;
  const email = component.state.email.value;
  const password = component.state.password.value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Logged in!', 'success');
      component.props.redirect('/');
    }
  });
}
