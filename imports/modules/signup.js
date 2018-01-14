/* eslint-disable prefer-destructuring */
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

let component;
const getUserData = () => ({
  email: component.state.email.value,
  password: component.state.password.value,
  profile: {
    name: {
      first: component.state.first.value,
      last: component.state.last.value,
    },
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Welcome!', 'success');
      component.props.redirect('/');
    }
  });
};

export default function handleSignup(options) {
  component = options.component;
  signup();
}
