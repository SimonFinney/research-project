// Imgur API

const request = require('./request');

const imgurConfiguration =
  (process.env.imgurConfiguration || require('../USER-DEFINED.json').imgur);

const requestOptions = {
  headers: { Authorization: `Client-ID ${imgurConfiguration.clientId}` },
};


function get(url, callback) {
  requestOptions.url = `${imgurConfiguration.baseUrl}${url}`;
  request.getRequest(requestOptions, responseData => callback(responseData));
}


function search(q, callback) {
  requestOptions.url = `${imgurConfiguration.baseUrl}gallery/search?q=${q}`;
  request.getRequest(requestOptions, responseData => callback(responseData));
}


module.exports = {
  get,
  search,
};
