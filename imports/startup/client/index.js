import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/app';
import '@shopify/polaris/styles.css';

Meteor.startup(() => render(<App />, document.getElementById('react-root')));
