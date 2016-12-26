// TODO: Comments

const express = require('express');
const imgur = require('./imgur');

const database = require('./database');
const manifest = require('../package.json');

const router = express.Router();

router.get('/', (request, response) =>
  imgur.search('dog', images =>
    response.render('views/index.nunjucks', {
      images,
      manifest,
    })
  )
);

module.exports = { router };
