# Simple 2-players game

This game is only a technical challenge. It was created for educational purposes.

## Requirements

- Node.js >= 8.x

## Getting started

### Run with node 

```bash
git clone git@github.com:cigolpl/game-challenge.git
cd game-challenge
npm install
PORT=3000 npm start
```

### Docker

```bash
docker build -t game-challenge -f Dockerfile .
docker run -it -p 3000:3000 game-challenge
```

## Endpoints

```bash
# Starting a new game and resetting all previous settings
curl -XPOST -H "Content-Type: application/json" http://localhost:3000/new_game
```

```bash
# It's responsible for a player move
curl -XPOST -H "Content-Type: application/json" http://localhost:3000/move
```

POST body params:

- `number` (it's required in first move but optional later)
- `token` (it's generated in first player move but required in next moves)

```bash
# It's returning game status (is game started, whose move, etc)
curl -XGET -H "Content-Type: application/json" http://localhost:3000/status
```

## Example game

```bash
curl -XPOST -H "Content-Type: application/json" http://localhost:3000/new_game
curl -XPOST -H "Content-Type: application/json" -d '{"number":60}' http://localhost:3000/move
curl -XPOST -H "Content-Type: application/json" -d '{"number":0}' http://localhost:3000/move
```

## Notes

- This app is not having linter for code checking. It would be a good practice though if working with more people
- All functions are async / await even if most of them are synchronous. It was done in order to easy switch to async functions (MongoDB, PSQL, Redis, etc)
- The input from user is not validated / checked. At this stage we believe external input to be correct
- Users are receiving generated token in their first moves. Token is required in next moves to be authenticated.  

## Tests

```
# Run all tests
npm test

# Run specific test
NODE_ENV=test mocha -b --exit tests/apiSpec.js
```
