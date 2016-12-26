// Database

// TODO: Comments
const firebase = require('firebase');

const firebaseConfiguration =
  (process.env.firebaseConfiguration || require('../USER-DEFINED.json').firebase);

const firebaseApp = firebase.initializeApp(firebaseConfiguration);
const database = firebaseApp.database();

const ref = 'data';
const data = database.ref(ref);


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


function del(id) {
  getById(id).remove();
}


function get(callback) {
  data.once('value')
    .then(value =>
      callback(value.val())
    );
}


function init() {
  data.on('child_added', value => console.log(value.key));
}


function read(id, callback) {
  getById(id).once('value')
    .then(value =>
      callback(value.val())
    );
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
  read,
  update,
};
