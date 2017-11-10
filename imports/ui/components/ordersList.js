/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResourceList,
  Spinner,
  TextStyle,
  Pagination,
  Card,
} from '@shopify/polaris';
import moment from 'moment';

class ListItem extends Component {
  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const {
      id, customer, financial_status, fulfillment_status, created_at, name,
    } = this.props;
    return (
      <ResourceList.Item
        url={`https://store-iskn-eur.myshopify.com/admin/orders/${id}`}
        attributeOne={name}
        attributeTwo={`${customer.first_name} ${customer.last_name}`}
        attributeThree={
          <TextStyle variation="subdued">{moment(created_at).calendar()}</TextStyle>
        }
        badges={[
          {
            content: this.jsUcfirst(financial_status),
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
};

export default class OrdersList extends Component {
  handleNext() {
    this.props.changePage(true);
  }

  handlePrevious() {
    this.props.changePage(false);
  }

  render() {
    return (
      !this.props.loading
        ? <div>
          <Card>
            <ResourceList
              items={this.props.orders}
              renderItem={(item, index) =>
                <ListItem key={index} {...item} />
              }
            />
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Pagination
                hasPrevious={!(this.props.page < 2)}
                onPrevious={() => this.handlePrevious()}
                hasNext={this.props.page > 0}
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
};
