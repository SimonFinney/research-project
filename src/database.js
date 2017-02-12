// Database

// TODO: Comments
const firebase = require('firebase');
const util = require('./util');

const firebaseConfiguration = {
  apiKey: util.getConfiguration('firebaseApiKey'),
  databaseURL: util.getConfiguration('firebaseDatabaseURL'),
};

const firebaseApp = firebase.initializeApp(firebaseConfiguration);

firebase.auth().signInWithEmailAndPassword(
  util.getConfiguration('firebaseEmail'),
  util.getConfiguration('firebasePassword')
);

const database = firebaseApp.database();

const data = database.ref('data');


function getById(id) {
  return data.child(id);
}


function del(id) {
  getById(id).remove();
}


function getValue(databaseReference, callback) {
  databaseReference.once('value')
    .then(value =>
      callback(value.val())
    );
}


function read(id, callback) {
  getValue(getById(id), callback);
}


function check(key) {
  read(key, databaseObject => {
    if (databaseObject) {
      const objectProperties = Object.keys(databaseObject);

      if (
        (objectProperties.length === 1) &&
        (objectProperties[0] === 'id')
      ) {
        del(key);
      }
    }
  });
}


function count(callback) {
  data.once('value')
    .then(value =>
      callback(value.numChildren())
    );
}


function create(newData, callback) {
  data.push(newData)
    .then(callback);
}


function get(callback) {
  getValue(data, callback);
}


function log(value) {
  console.log(value.key);
}


function init() {
  data.on('child_added', log);
  data.on('child_changed', log);
}


function update(id, newData, callback) {
  getById(id).update(newData)
    .then(callback);
}


init();

module.exports = {
  check,
  count,
  create,
  get,
  update,
};
