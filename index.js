// Server

// TODO: Comments
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const minifyHtml = require('express-minify-html');
const nunjucks = require('nunjucks');

const router = require('./src/router');
const util = require('./src/util');

const server = express();

const serverDirectory = (util.isDebug() ? '.tmp' : 'dist');
const staticAssets = express.static(`${__dirname}/${serverDirectory}/`);

server.disable('view cache');

server.use(staticAssets);

server.use(
  bodyParser.json()
);

server.use(
  bodyParser.urlencoded({ extended: true })
);

server.use('/', router.router);

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

server.set('json spaces', 2);

nunjucks.configure('templates', {
  autoescape: true,
  express: server,
});

server.host = server.set('host', (process.env.HOST || 'http://localhost'));
server.port = server.set('port', (process.env.PORT || 8080));

const port = server.get('port');

server.listen(port, () => {
  server.address = `${server.get('host')}:${port}`;
  console.log(`Listening at ${server.address}`);
});

module.exports = server;
