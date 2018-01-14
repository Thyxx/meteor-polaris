/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Select,
  Button,
} from '@shopify/polaris';
import Divider from './divider';

export default class OrdersFilter extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      selectFilter: 'Select a filter...',
      selectValue: 'Select a value...',
    };
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleClosePopover = this.handleClosePopover.bind(this);
  }

  handleAddFilter(filter, value) {
    if (filter !== 'Select a filter...' && value !== 'Select a value...') {
      const filterContent = {
        filter,
        value,
        details: `${filter} is ${value}`,
      };
      this.handleClosePopover();
      this.props.addFilter(filterContent);
    }
  }

  handleClosePopover() {
    this.setState({
      active: false,
      selectFilter: 'Select a filter...',
      selectValue: 'Select a value...',
    });
  }

  render() {
    return (
      <Popover
        sectioned
        active={this.state.active}
        activator={
          <Button
            disclosure
            onClick={() => this.setState({ active: !this.state.active })}
          >
            Filter Orders
          </Button>
        }
        onClose={() => this.handleClosePopover()}
      >
        <Select
          label="Show all orders where:"
          value={this.state.selectFilter}
          options={[
            'Select a filter...',
            {
              label: 'Status',
              value: 'status',
            },
            {
              label: 'Payment Status',
              value: 'financial_status',
            },
          ]}
          onChange={value => this.setState({ selectFilter: value })}
        />
        {
          this.state.selectFilter === 'status'
          ? <div>
            <Divider height={8}/>
            <Select
              value={this.state.selectValue}
              options={[
                'Select a value...',
                'open',
                'closed',
                'cancelled',
                'any',
              ]}
              onChange={value => this.setState({ selectValue: value })}
            />
            <Divider height={8}/>
            <Button
              size="slim"
              onClick={() => this.handleAddFilter(this.state.selectFilter, this.state.selectValue)}
            >
              Add filter
            </Button>
          </div>
          : <div>
            <Divider height={8}/>
            <Select
              value={this.state.selectValue}
              options={[
                'Select a value...',
                'pending',
                'authorized',
                'paid',
                'partially_paid',
                'refunded',
                'partially_refunded',
                'voided',
              ]}
              onChange={value => this.setState({ selectValue: value })}
            />
            <Divider height={8}/>
            <Button
              size="slim"
              onClick={() => this.handleAddFilter(this.state.selectFilter, this.state.selectValue)}
            >
              Add filter
            </Button>
          </div>
        }
      </Popover>
    );
  }
}

OrdersFilter.propTypes = {
  addFilter: PropTypes.func,
};
