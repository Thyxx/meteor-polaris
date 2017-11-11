/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResourceList,
  Spinner,
  TextStyle,
  Pagination,
  Card,
  Popover,
  Select,
  Button,
  TextField,
  Icon,
} from '@shopify/polaris';
import moment from 'moment';

class ListItem extends Component {
  constructor() {
    super();
    this.renderOrderUrl = this.renderOrderUrl.bind(this);
  }

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderOrderUrl(storeUrl, orderId) {
    const url = new URL(storeUrl);
    const { protocol, pathname } = url;
    const storeId = pathname.split('/')[1];
    const { stores } = this.props;
    const index = stores.findIndex(i => i.id === Number(storeId));
    const store = stores[index];
    return `${protocol}//${store.url}/admin/orders/${orderId}`;
  }

  render() {
    const {
      id, customer, financial_status, fulfillment_status, created_at, name, order_status_url,
    } = this.props;
    return (
      <ResourceList.Item
        actions={[{
          content: 'View order details',
          onAction: () => window.open(this.renderOrderUrl(order_status_url, id)),
        }]}
        persistActions
        external
        attributeOne={name}
        attributeTwo={`${customer.first_name} ${customer.last_name}`}
        attributeThree={
          <TextStyle variation="subdued">{moment(created_at).calendar()}</TextStyle>
        }
        badges={[
          {
            content: this.jsUcfirst(financial_status),
            status: financial_status === 'authorized' ? 'attention' : 'default',
          },
          {
            content: !fulfillment_status ? 'Unfulfilled' : this.jsUcfirst(fulfillment_status),
            status: !fulfillment_status ? 'attention' : 'default',
            progress: 'incomplete',
          },
        ]}
      />
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  created_at: PropTypes.string,
  fulfillment_status: PropTypes.string,
  financial_status: PropTypes.string,
  customer: PropTypes.object,
  order_status_url: PropTypes.string,
  stores: PropTypes.array,
};

export default class OrdersList extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      value: '',
    };
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
                connectedLeft={
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
                    onClose={() => this.setState({ active: false })}
                  >
                    <Select
                      label="Show all orders where:"
                      options={[
                        'two',
                        'three',
                        {
                          label: 'four',
                          value: '4',
                        },
                      ]}
                      placeholder="Select"
                    />
                  </Popover>
                }
              />
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
  page: PropTypes.number,
};
