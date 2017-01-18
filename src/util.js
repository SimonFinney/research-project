// Utilities
const express = require('express');
const server = express();

const numberofVariations = 4;


function delegateVariation(count) {
  return (count % numberofVariations);
}


function getConfiguration(configurationVariable) {
  return (
    process.env[configurationVariable] || require('../USER-DEFINED.json')[configurationVariable]
  );
}


function getDatetime() {
  return (+ new Date);
}


function getId(request) {
  return (request.headers['x-forwarded-for'] || request.connection.remoteAddress);
}


function isDebug() {
  return (server.get('env') === 'development');
}


module.exports = {
  delegateVariation,
  getConfiguration,
  getDatetime,
  getId,
  isDebug,
};
