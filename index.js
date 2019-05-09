'use strict';

const request = require('request');

class ChainKit {
  constructor(options) {
    const { accessKey, environment } = options;

    if (!accessKey) throw new Error('missing access key');
    if (!environment) throw new Error('missing environment');

    this.request = request;
    this.environment = environment;
    this.accessKey = accessKey;

    if (environment === 'test') {
      this.apiGatewayBaseUrl = 'https://chainkit.api.squeezer.io/dev';
    }

    if (environment === 'live') {
      this.apiGatewayBaseUrl = '';
      throw new Error('live environment not yet available');
    }
  }

  configureItnUrl(options, callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/itn/configure/url`,
      method: 'POST',
      json: {
        accessKey: this.accessKey,
        url: options.url
      }
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  walletTypes(callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/types`,
      method: 'GET',
      json: true
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  createWallet(options, callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/create`,
      method: 'POST',
      json: {
        type: options.type,
        accessKey: this.accessKey,
        secret: options.secret,
        options: options.options
      }
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  sendTransaction(options, callback) {
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/sendTransaction`,
      method: 'POST',
      json: {
        walletId: options.walletId,
        amount: options.amount,
        to: options.to,
        token: options.token,
        accessKey: this.accessKey,
        secret: options.secret
      }
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  getTransactions(options, callback) {
    const { walletId } = options;
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/${walletId}/transactions`,
      method: 'GET',
      json: true
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }

  getBalance(options, callback) {
    const { walletId } = options;
    request({
      url: `${this.apiGatewayBaseUrl}/v1/wallet/${walletId}/balance`,
      method: 'GET',
      json: true
    }, (error, response, body) => {
      if (error) callback(error);
      callback(null, body);
    });
  }
}

module.exports = ChainKit;
