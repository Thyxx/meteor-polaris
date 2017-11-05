import { Meteor } from 'meteor/meteor';
import { Stores } from './stores.js';
import { check } from 'meteor/check';
import ShopifyToken from 'shopify-token';
import Shopify from 'shopify-api-node';

const shopifyToken = new ShopifyToken({
  sharedSecret: Meteor.settings.private.OAuth.shopify.sharedSecret,
  redirectUri: Meteor.settings.private.OAuth.shopify.redirectUri,
  apiKey: Meteor.settings.private.OAuth.shopify.apiKey,
});

Meteor.methods({
  'shopify.getRedirectUrl'(storeName) {
    check(storeName, String);
    const url = shopifyToken.generateAuthUrl(storeName, ['read_orders']);
    return url;
  },
  'shopify.createShop'(code, shop) {
    check(shop, String);
    check(code, String);
    return shopifyToken.getAccessToken(shop, code)
    .then((token) => {
      Stores.insert({
        storeUrl: shop,
        token,
        createdAt: new Date(),
        storeName: shop.replace('.myshopify.com', ''),
      });
    }, (err) => {
      throw new Meteor.Error(err);
    });
  },
});
