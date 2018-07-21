'use strict';

const service = require('./../src/service');
const _ = require('lodash');
const assert = require('assert');

if (process.env.NODE_ENV !== 'test') {
  throw new Error('Test environment requires NODE_ENV=test variable');
}

describe('simple game scenarios', function() {

  it('starts a game users make a first move and after that user get error of not providing token', async function test() {

    await service.new_game();

    // first move
    await service.move({
      number: 100
    })

    // first move of second player
    await service.move()

    try {
      await service.move()
      throw new Error()
    } catch (e) {
      assert.equal('Please provide a correct token to continue a game', e.message);
    }
  })

  it('starts a game, first user make a move and second user is not providing number', async function test() {

    await service.new_game();

    // first move
    await service.move({
      number: 100
    })

    var result = await service.move()
    assert.equal(-1, result.added_number);
    assert.equal(33, result.resulting_number);
  })

  it('throws an error when in the second move number is not valid or out of range', async function test() {

    await service.new_game();

    // first move
    await service.move({
      number: 100
    })


    try {
      var result = await service.move({
        number: 100
      })
      throw new Error()
    } catch (e) {
      assert.equal('Provided number is not valid or out of range', e.message);
    }

    try {
      var result = await service.move({
        number: 0
      })
      throw new Error()
    } catch (e) {
      assert.equal('Provided number is not valid or out of range', e.message);
    }

    var result = await service.move({
      number: -1
    })
    assert.equal(33, result.resulting_number);
  })

  it('starts a game and user gets a token', async function test() {

    await service.new_game();

    var result = await service.move({
      number: 55,
    })

    assert.equal('first', result.token);
    assert.equal(1, result.move_number);
    assert.equal(55, result.added_number);
    assert.equal(55, result.resulting_number);
  })

  it('makes a first move by a second user', async function test() {

    var result = await service.move({
      number: -1,
    })

    assert.equal('second', result.token);
    assert.equal(2, result.move_number);
    assert.equal(-1, result.added_number);
    assert.equal(18, result.resulting_number);
  })

  it('makes third move in a game', async function test() {

    var result = await service.move({
      number: 0,
      token: 'first'
    })

    assert.equal('first', result.token);
    assert.equal(0, result.added_number);
    assert.equal(6, result.resulting_number);
  })

  it('makes fourth move in a game without providing param (auto move)', async function test() {

    var result = await service.move({
      token: 'second'
    })

    assert.equal('second', result.token);
    assert.equal(0, result.added_number);
    assert.equal(2, result.resulting_number);
    assert.equal(null, result.is_win);
  })

  it('makes last winning move in a game without providing param (auto move)', async function test() {

    var result = await service.move({
      token: 'first'
    })

    assert.equal('first', result.token);
    assert.equal(1, result.added_number);
    assert.equal(1, result.resulting_number);
    assert.equal(true, result.is_win);
  })

  it('cannot makes a next move as a game is finished', async function test() {

    try {
      await service.move()
      throw new Error()
    } catch (e) {
      assert.equal('Game is finished. Please start a new game', e.message);
    }
  })
})
