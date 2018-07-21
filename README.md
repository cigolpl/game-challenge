# Simple 2-players game

This game is only a technical challenge. It was created for educational purposes. I recommend playing chess or go if you want to have more fun.

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

- didn't use a code linter
- all functions are async / await in order to easy switch to async functions

