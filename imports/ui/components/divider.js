import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Divider extends Component {
  render() {
    return (
      <div style={{ paddingTop: `${this.props.height}px` }}></div>
    );
  }
}

Divider.propTypes = {
  height: PropTypes.number.isRequired,
};
