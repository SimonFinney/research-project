// Imgur API

// TODO: Comments
const request = require('./request');
const util = require('./util');

const baseUrl = 'https://api.imgur.com/3/';
const imgurClientId = util.getConfiguration('imgurClientId');

const requestOptions = {
  headers: { Authorization: `Client-ID ${imgurClientId}` },
};


function get(url, callback) {
  requestOptions.url = `${baseUrl}${url}`;
  request.get(requestOptions, responseJson => callback(
    responseJson
  ));
}


module.exports = { get };
