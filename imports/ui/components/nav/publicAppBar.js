import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
} from '@shopify/polaris';

export default class PublicAppBar extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#43467F' }}>
        <div style={{ padding: '15px' }}>
          <Stack>
            <Stack.Item fill>
              <Link to='/'><p style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Shopify Manager</p></Link>
            </Stack.Item>
            <Stack.Item>
              <Link to='/login'><p style={{ color: 'white', fontSize: '16px' }}>Login</p></Link>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    );
  }
}
