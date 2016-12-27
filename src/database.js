// Database

// TODO: Comments
const firebase = require('firebase');

const firebaseConfiguration =
  (process.env.firebase || require('../USER-DEFINED.json').firebase);

const firebaseApp = firebase.initializeApp(firebaseConfiguration);
const database = firebaseApp.database();

const data = database.ref('data');
const debug = database.ref('debug');


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


function getById(id) {
  return data.child(id);
}


function getValue(databaseReference, callback) {
  databaseReference.once('value')
    .then(value =>
      callback(value.val())
    );
}


function isDebug(callback) {
  getValue(debug, callback);
}


function del(id) {
  getById(id).remove();
}


function get(callback) {
  getValue(data, callback);
}


function init() {
  data.on('child_added', value => console.log(value.key));
}


function read(id, callback) {
  getValue(getById(id), callback);
}


function update(id, newData) {
  getById(id).set(newData);
}


init();

module.exports = {
  count,
  create,
  del,
  get,
  isDebug,
  read,
  update,
};
