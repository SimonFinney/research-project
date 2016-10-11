// Server

// TODO: Comments
const compression = require('compression');
const express = require('express');
const firebase = require('firebase');
const minifyHtml = require('express-minify-html');
const nunjucks = require('nunjucks');

const app = express();

app.use(compression());

app.use(
  minifyHtml(
    {
      htmlMinifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }
    }
  )
);

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});


const firebaseConfiguration =
  (process.env.firebaseConfiguration || require('./USER-DEFINED.json').firebase);
const firebaseApp = firebase.initializeApp(firebaseConfiguration);
const database = firebaseApp.database();


app.get('/', (request, response) => {
  response.render('index.html', {
    title: 'Research project',
  });
});


const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 8080;

app.host = app.set('host', host);
app.port = app.set('port', port);

const serverPort = app.get('port');


app.listen(serverPort, function() {
  app.address = `${app.get('host')}:${serverPort}`;
  console.log(`Listening at ${app.address}`);
});

module.exports = app;
