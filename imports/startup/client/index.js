import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import '@shopify/polaris/styles.css';
import App from '../../ui/layouts/app';

Meteor.startup(() => render(<App />, document.getElementById('react-root')));
