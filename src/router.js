// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const manifest = require('../package.json');

const router = express.Router();
const server = express();
const isDebug = (server.get('env') === 'development');

router.get('/', (request, response) =>
  imgur.search('dog', images =>
    response.render('views/index.nunjucks', {
      images,
      isDebug,
      manifest,
    })
  )
);

module.exports = { router };
