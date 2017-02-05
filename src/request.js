// Request

const request = require('request');


function get(optionsToModify, callback) {
  const options = optionsToModify;
  options.method = 'GET';

  request(options, (error, response) =>
    callback(
      error || JSON.parse(response.body)
    )
  );
}


module.exports = { get };
