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


function isDebug() {
  return (server.get('env') === 'development');
}


module.exports = {
  delegateVariation,
  getConfiguration,
  isDebug,
};
