const path = require('path');

exports.default = ['/pokemons', async (req, res) => {
    const POKEDEX_SRC = "../DATA/pokedex.json";

    const filePath = path.join(__dirname, POKEDEX_SRC);
    res.sendFile(filePath);

}];