// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const manifest = require('../package.json');
const util = require('./util');

const router = express.Router();
const server = express();
const isDebug = (server.get('env') === 'development');

router.get('/', (request, response) =>
  database.count(count => {
    const variation = util.delegateVariation(count);

    imgur.search('dog', images =>
      response.render('views/index.nunjucks', {
        images,
        isDebug,
        manifest,
        variation,
      })
    );
  })
);

module.exports = { router };
