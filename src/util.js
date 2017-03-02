// Utilities

// TODO: Comments
const express = require('express');
const server = express();

const numberofVariations = 4;


function delegateVariation(databaseEntriesLength) {
  return (databaseEntriesLength % numberofVariations); // Accounts for the control variation
}


function getConfiguration(configurationVariable) {
  return (
    process.env[configurationVariable] || require('../USER-DEFINED.json')[configurationVariable]
  );
}


function getDatetime() {
  return (+ new Date);
}


function getIpAddress(request) {
  return (request.headers['x-forwarded-for'] || request.connection.remoteAddress);
}


function isDebug() {
  return (server.get('env') === 'development');
}


function getMaxAge() {
  return (isDebug() ? 180000 : 1200000);
}


function shuffle(arrayToShuffle) {
  const array = arrayToShuffle;

  let i = 0;
  let temporaryVariable = null;

  array.forEach(
    (arrayItem, index) => {
      i = Math.floor(
        (Math.random() * (index + 1))
      );

      temporaryVariable = array[index];
      array[index] = array[i];
      array[i] = temporaryVariable;
    }
  );

  return array;
}


module.exports = {
  delegateVariation,
  getConfiguration,
  getDatetime,
  getIpAddress,
  getMaxAge,
  isDebug,
  shuffle,
};
