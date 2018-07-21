const FIRST_USER_TOKEN = 'first';
const SECOND_USER_TOKEN = 'second';
const PLAYER1 = 'player_1';
const PLAYER2 = 'player_2';
var finished = false;
var started = false;
var move_number = 1;
var current_number;
var winner = null;

/**
 * should go to helper function
 */
module.exports.calculateMoveNumber = function(a) {

  var map = {
    2: 1,
    0: 0,
    1: -1
  }

  return map[a % 3];
}

module.exports.getCounter = async function() {

  return move_number;
}

/**
 * main module responsible for game logic
 * the game states are stored in memory
 */
module.exports.move = async function(data) {

  data = data || {};

  var token = FIRST_USER_TOKEN;
  var number = data.number;

  if (current_number === 1) {
    throw new Error('Game is finished. Please start a new game');
  }

  if (move_number === 1 && !data.number) {
    throw new Error('The number in first move is required');
  }

  if (move_number === 1) {
    current_number = number;
  }

  if (move_number % 2 === 0) {
    token = SECOND_USER_TOKEN;
  }

  if (move_number >= 3 && data.token !== token) {
    throw new Error('Please provide a correct token to continue a game');
  }

  if (!number && number !== 0) {
    number = module.exports.calculateMoveNumber(current_number);
  }

  // check if provided token is correct
  var resulting_number = number;

  if (move_number > 1) {
    if ((current_number + number) % 3 !== 0 || [-1, 0, 1].indexOf(number) === -1) {
      throw new Error('Provided number is not valid or out of range');
    }

    resulting_number = (current_number + number) / 3;
  }

  current_number = resulting_number;

  if (resulting_number === 1) {
    finished = true;

    winner = move_number % 2 === 1 ? PLAYER1 : PLAYER2;
  }

  // when move is finished - increase a number
  ++move_number;

  started = true;


  return {
    token: token,
    move_number: move_number - 1,
    added_number: number,
    is_win: resulting_number === 1 ? true : null,
    resulting_number: resulting_number
  }
}

module.exports.status = async function(data) {

  var whose_move = null;

  if (!finished) {
    whose_move = move_number % 2 === 1 ? PLAYER1 : PLAYER2
  }

  return {
    started: started,
    finished: finished,
    move_number: move_number - 1,
    whose_move: whose_move,
    winner: winner
  }
}

module.exports.new_game = async function(data) {
  move_number = 1;
  current_number = undefined;
  started = false;
  finished = false;
}
