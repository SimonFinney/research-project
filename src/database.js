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
const urls = database.ref('urls');


function getById(id, databaseReference = data) {
  return databaseReference.child(id);
}


function del(id, databaseReference = data) {
  getById(id, databaseReference).remove();
}


function deleteUrl(url) {
  del(url, urls);
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


function checkUrl(url, callback) {
  getValue(
    urls, urlObjects => {
      const urlObjectsProperties = Object.keys(urlObjects);

      const urlArray = urlObjectsProperties.filter(
        urlObjectsValues => (urlObjects[urlObjectsValues].url === url)
      );

      const isValidUrl = (urlArray.length > 0);

      callback(isValidUrl, urlArray[0]);
    }
  );
}


function count(callback) {
  data.once('value')
    .then(value =>
      callback(value.numChildren())
    );
}


function create(newData, callback, databaseReference = data) {
  databaseReference.push(newData)
    .then(callback);
}


function createUrl(url, callback) {
  create({ url }, callback, urls);
}


function get(callback) {
  getValue(data, responseData =>
    callback(
      Object.values(responseData)
    )
  );
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
  checkUrl,
  count,
  create,
  createUrl,
  deleteUrl,
  get,
  update,
};
