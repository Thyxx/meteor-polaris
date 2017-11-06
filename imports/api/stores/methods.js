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
    // TODO: Add method to check if the user is connected
    check(storeName, String);
    const url = shopifyToken.generateAuthUrl(storeName, ['read_orders']);
    return url;
  },
  'shopify.createShop': function createShop(code, shop) {
    // TODO: Add method to check if the user is connected
    check(shop, String);
    check(code, String);
    return shopifyToken.getAccessToken(shop, code)
      .then((token) => {
        const storeExists = Stores.find({ storeUrl: shop }).fetch();
        if (storeExists.length === 0) {
          Stores.insert({
            storeUrl: shop,
            token,
            createdAt: new Date(),
            storeName: shop.replace('.myshopify.com', ''),
          });
        } else {
          throw new Meteor.Error('This store already exists.');
        }
      }, (err) => {
        throw new Meteor.Error(err);
      });
  },
  'shopify.removeShop': function removeShop(id) {
    // TODO: Add method to check if the user is connected and if he's the shop owner
    check(id, String);
    const store = Stores.findOne(id);
    const shopify = new Shopify({
      shopName: store.storeName,
      accessToken: store.token,
    });
    shopify.apiPermission.delete()
      .then(() => {
        Stores.remove(id);
      })
      .catch(err => console.log(err));
  },
});
