const path = require('path');
const fs = require('fs');

exports.default = ['/pokemons/random', async (req, res) => {
    const POKEDEX_SRC = "../DATA/pokedex.json";
    const filePath = path.join(__dirname, POKEDEX_SRC);
    const pokemons = fs.readFileSync(filePath)
    const pokedex = JSON.parse(pokemons);
    const pokeRandom = Math.floor(Math.random() * (pokedex.length - 1));
    
    res.send(pokedex[pokeRandom]);

}];