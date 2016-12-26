// Database
const firebase = require('firebase');

const firebaseConfiguration =
  (process.env.firebaseConfiguration || require('../USER-DEFINED.json').firebase);

const firebaseApp = firebase.initializeApp(firebaseConfiguration);
const database = firebaseApp.database();

module.exports = { database };
