// Server

// TODO: Comments
const compression = require('compression');
const express = require('express');
const firebase = require('firebase');
const minifyHtml = require('express-minify-html');
const nunjucks = require('nunjucks');

const server = express();

const serverDirectory = (process.env.NODE_ENV ? 'dist' : '.tmp');
const staticAssets = express.static(`${__dirname}/${serverDirectory}/`);
server.use(staticAssets);

server.use(
  compression()
);

server.use(
  minifyHtml(
    {
      htmlMinifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }
  )
);

nunjucks.configure('templates', {
  autoescape: true,
  express: server,
});

const firebaseConfiguration =
  (process.env.firebaseConfiguration || require('./USER-DEFINED.json').firebase);
const firebaseApp = firebase.initializeApp(firebaseConfiguration);
const database = firebaseApp.database();

const imgur = require('./src/imgur');


server.get('/', (request, response) =>
  imgur.search('dog', images =>
    response.render('views/index.nunjucks', {
      images,
      title: 'Research project',
    })
  )
);


const host = (process.env.HOST || 'http://localhost');
const port = (process.env.PORT || 8080);

server.host = server.set('host', host);
server.port = server.set('port', port);

const serverPort = server.get('port');


server.listen(serverPort, () => {
  server.address = `${server.get('host')}:${serverPort}`;
  console.log(`Listening at ${server.address}`);
});

module.exports = server;
