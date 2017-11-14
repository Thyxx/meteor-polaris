/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResourceList,
  Spinner,
  Pagination,
  Card,
  TextField,
  Icon,
  Tag,
  Stack,
} from '@shopify/polaris';
import _ from 'underscore';
import update from 'immutability-helper';
import Divider from './divider';
import ListItem from './ordersListItem';
import OrdersFilter from './ordersFilter';

export default class OrdersList extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      filters: [],
    };
    this.addFilter = this.addFilter.bind(this);
  }

  handleNext() {
    this.props.changePage(true);
  }

  handlePrevious() {
    this.props.changePage(false);
  }

  valueUpdater() {
    return (value) => {
      this.props.handleSearch(value);
      this.setState({ value });
    };
  }

  addFilter(filter) {
    if (_.findIndex(this.state.filters, { filter: filter.filter }) < 0) {
      this.setState(prevState => ({
        filters: prevState.filters.push(filter) && prevState.filters,
      }));
    } else {
      const index = this.state.filters.findIndex(e => e.filter === filter.filter);
      const updatedFilters = update(this.state.filters, { $splice: [[index, 1, filter]] });
      this.setState({ filters: updatedFilters });
    }
    this.props.updateFilters(filter);
  }

  renderTags() {
    return this.state.filters.map((filter, index) =>
      <Tag key={index} onRemove={() => {
        this.setState({
          filters: update(this.state.filters, { $splice: [[index, 1]] }),
        });
        this.props.updateFilters({ filter: filter.filter, value: 'any' });
      }}>
        {filter.details}
      </Tag>);
  }

  render() {
    const {
      loading, orders, page, stores,
    } = this.props;
    return (
      !loading
        ? <div>
          <Card>
            <Card.Section>
              <TextField
                value={this.state.value}
                prefix={<Icon color={'inkLightest'} source="search" />}
                placeholder="Search orders"
                onChange={this.valueUpdater()}
                connectedLeft={<OrdersFilter addFilter={this.addFilter}/>}
              />
              <Divider height={8}/>
              <Stack spacing="extraTight">
                {this.renderTags()}
              </Stack>
            </Card.Section>
            <ResourceList
              items={orders}
              renderItem={(item, index) =>
                <ListItem key={index} stores={stores} {...item} />
              }
            />
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Pagination
                hasPrevious={!(page < 2)}
                onPrevious={() => this.handlePrevious()}
                hasNext={orders.length > 49}
                onNext={() => this.handleNext()}
              />
            </div>
          </Card>
        </div>
        : <div style={{ textAlign: 'center', padding: '20px' }}><Spinner/></div>
    );
  }
}

OrdersList.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  stores: PropTypes.array,
  changePage: PropTypes.func,
  handleSearch: PropTypes.func,
  updateFilters: PropTypes.func,
  page: PropTypes.number,
};
