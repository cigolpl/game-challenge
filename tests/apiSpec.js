'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const server = require('./../src/server')
const PORT = 3999;
const request = require('superagent');

describe('api', function() {

  before(async function() {

    await new Promise(resolve => {
      server.listen(PORT, () => {
        return resolve();
      })
    })
    .delay(100)
  })

  it('starts a new game and checks result', function test(done) {

    request
    .post(`http://localhost:${PORT}/new_game`)
    .end((err, res) => {
      assert.equal('New game has started.', res.body.message);
      assert.equal(200, res.statusCode);
      done();
    });
  })

  it('makes a move and check results', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      number: 20
    })
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(20, res.body.added_number);
      assert.equal(20, res.body.resulting_number);
      assert.equal(1, res.body.move_number);
      assert.ok(typeof res.body.token === 'string');
      done();
    });
  })

  it('checks a game status', function test(done) {

    request
    .get(`http://localhost:${PORT}/status`)
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(true, res.body.started);
      assert.equal(false, res.body.finished);
      assert.equal('player_2', res.body.whose_move);
      assert.equal(1, res.body.move_number);
      done();
    });
  })

  it('makes a move by a second player', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      number: 1
    })
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(1, res.body.added_number);
      assert.equal(7, res.body.resulting_number);
      assert.equal(2, res.body.move_number);
      assert.ok(typeof res.body.token === 'string');
      done();
    });
  })

  it('makes a incorrect move by a first player', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      number: 3
    })
    .end((err, res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  })

  it('returns an error because of not providing token', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
    })
    .end((err, res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  })

  it('makes a correct move by a first player', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      token: 'first'
    })
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(-1, res.body.added_number);
      assert.equal(2, res.body.resulting_number);
      assert.equal(3, res.body.move_number);
      done();
    });
  })

  it('returns an error once user wants to make 2 moves in a row', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      token: 'first'
    })
    .end((err, res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  })


  it('makes a correct / winning move by a second player', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      token: 'second'
    })
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(1, res.body.added_number);
      assert.equal(1, res.body.resulting_number);
      assert.equal(4, res.body.move_number);
      assert.equal(true, res.body.is_win);
      done();
    });
  })

  it('returns an error once player want to play finished game', function test(done) {

    request
    .post(`http://localhost:${PORT}/move`)
    .send({
      token: 'first'
    })
    .end((err, res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  })

  it('checks a finished game status', function test(done) {

    request
    .get(`http://localhost:${PORT}/status`)
    .send({
      token: 'second'
    })
    .end((err, res) => {
      assert.equal(200, res.statusCode);
      assert.equal(true, res.body.started);
      assert.equal(true, res.body.finished);
      assert.equal(null, res.body.whose_move);
      assert.equal(4, res.body.move_number);
      done();
    });
  })
})
