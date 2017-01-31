// Utilities
const express = require('express');
const server = express();

const numberofVariations = 4;


function delegateVariation(databaseEntriesLength) {
  const count = ((databaseEntriesLength <= 0) ? databaseEntriesLength : (databaseEntriesLength - 1));
  return (count % numberofVariations); // Accounts for the control variation
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
  return (isDebug() ? 180000 : 600000);
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
