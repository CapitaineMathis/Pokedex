# Pokedex API

A simple Node.js and Express API for a Pokedex.

## Install & Run

```bash
npm install
node app.js
```

The API runs on http://localhost:8085

## Endpoints

- Get Pokemon by ID: `GET /api/v1/pokemons/:id`
- Get Pokemon by Name: `GET /api/v1/pokemons/:name`
- Get random Pokemon: `GET /api/v1/pokemons/random`
- Get all Pokemon: `GET /api/v1/pokemons`

## Rate Limiting

Requests are limited per IP address. If you exceed the allowed number of requests, the API returns a 429 Too Many Requests status code.