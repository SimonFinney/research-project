// Server

// TODO: Comments
const compression = require('compression'),
  express = require('express'),
  minifyHtml = require('express-minify-html'),
  nunjucks = require('nunjucks');

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


app.get('/', (request, response) => {
  response.render('index.html', {
    title: 'Hello World!'
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
