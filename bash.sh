curl -XPOST -H "Content-Type: application/json" http://localhost:3000/new_game
curl -XPOST -H "Content-Type: application/json" -d '{"number":60}' http://localhost:3000/move
curl -XPOST -H "Content-Type: application/json" -d '{"number":0}' http://localhost:3000/move
curl -XPOST -H "Content-Type: application/json" -d '{"number":0}' http://localhost:3000/move
