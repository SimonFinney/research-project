// Request

const request = require('request');


function getRequest(optionsToModify, callback) {
  const options = optionsToModify;
  options.method = 'GET';

  request(options, (error, response) =>
    callback(error || response.body)
  );
}


module.exports = { getRequest };
