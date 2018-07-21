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

## Example game

```bash
curl -XPOST -H "Content-Type: application/json" http://localhost:3000/new_game
curl -XPOST -H "Content-Type: application/json" -d '{"number":60}' http://localhost:3000/move
curl -XPOST -H "Content-Type: application/json" -d '{"number":0}' http://localhost:3000/move
```

## Notes

- This app is not having linter for code checking. It would be a good practice if working with more people
- All functions are async / await even if most of them are synchronous. It was done in order to easy switch to async functions (MongoDB, PSQL, Redis, etc)

