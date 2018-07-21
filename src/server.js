const express = require('express');
const app = express();
const Promise = require('bluebird');
Promise.config({
  warnings: false
})

const _ = require('lodash');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const service = require('./service');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/new_game', async function(req, res) {

  // we trust a user input here
  await service.new_game();
  return res.json({
    message: 'New game has started.'
  });
})

app.post('/move', async function(req, res) {

  // parse number

  // we trust a user input here
  await service.move(req.body)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
})

/**
 * everyone has access to status
 */
app.get('/status', async function(req, res) {

  await service.status(req.body);

  return res.json({
    active: false
  })
})

module.exports = app;
