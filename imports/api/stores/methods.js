/* eslint-disable func-names */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ShopifyToken from 'shopify-token';
import Shopify from 'shopify-api-node';
import { Stores } from './stores.js';

const shopifyToken = new ShopifyToken({
  sharedSecret: Meteor.settings.private.OAuth.shopify.sharedSecret,
  redirectUri: Meteor.settings.private.OAuth.shopify.redirectUri,
  apiKey: Meteor.settings.private.OAuth.shopify.apiKey,
});

Meteor.methods({
  'shopify.getRedirectUrl': function getRedirectUrl(storeName) {
    check(storeName, String);
    if (this.userId) {
      const url = shopifyToken.generateAuthUrl(storeName, ['read_orders', 'write_reports', 'read_reports', 'read_analytics']);
      return url;
    }
    throw new Meteor.Error('User not allowed.');
  },
  'shopify.createShop': function createShop(code, shop) {
    check(shop, String);
    check(code, String);
    if (this.userId) {
      return shopifyToken.getAccessToken(shop, code)
        .then((token) => {
          const storeExists = Stores.findOne({ storeUrl: shop });
          if (!storeExists) {
            Stores.insert({
              storeUrl: shop,
              token,
              createdAt: new Date(),
              storeName: shop.replace('.myshopify.com', ''),
              owner: this.userId,
            });
          } else {
            Stores.update(storeExists._id, {
              $set: {
                token,
              },
            });
          }
        });
    }
    throw new Meteor.Error('User not allowed.');
  },
  'shopify.removeShop': function removeShop(id) {
    check(id, String);
    const store = Stores.findOne(id);
    if (store && this.userId && store.owner === this.userId) {
      const shopify = new Shopify({
        shopName: store.storeName,
        accessToken: store.token,
      });
      shopify.apiPermission.delete()
        .then(() => {
          Stores.remove(id);
        })
        .catch(err => Stores.remove(id));
    }
  },
  'shopify.isTokenActive': function isTokenActive(id) {
    const store = Stores.findOne(id);
    if (store && this.userId && store.owner === this.userId) {
      const shopify = new Shopify({
        shopName: store.storeName,
        accessToken: store.token,
      });
      return shopify.shop.get()
        .then(() => true)
        .catch(err => false);
    }
    throw new Meteor.Error('Not allowed.');
  },
  'shopify.getOrders': async function (page) {
    check(page, Number);
    if (this.userId) {
      const stores = Stores.find({ owner: this.userId }).fetch();
      let orders = [];
      await Promise.all(stores.map(async (store) => {
        const shopify = new Shopify({
          shopName: store.storeName,
          accessToken: store.token,
        });
        const array = await shopify.order.list({
          page,
          status: 'any',
          fields: [
            'created_at',
            'id',
            'name',
            'financial_status',
            'customer',
            'fulfillment_status',
          ],
        });
        orders = orders.concat(array);
      }));
      return orders;
    }
    throw new Meteor.Error('User not allowed.');
  },
});
