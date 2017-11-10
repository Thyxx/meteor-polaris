import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import {
  Stack,
} from '@shopify/polaris';

export default class AuthenticatedAppBar extends Component {
  handleLogout() {
    Meteor.logout();
  }
  render() {
    return (
      <div style={{ backgroundColor: '#43467F' }}>
        <div style={{ padding: '15px' }}>
          <Stack>
            <Stack.Item fill>
              <Link to='/'><p style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Shopify Manager</p></Link>
            </Stack.Item>
            <Stack.Item>
              <Link to='/settings'><p style={{ color: 'white', fontSize: '16px' }}>Settings</p></Link>
            </Stack.Item>
            <Stack.Item>
              <a href="#" onClick={() => this.handleLogout()}><p style={{ color: 'white', fontSize: '16px' }}>Logout</p></a>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    );
  }
}
