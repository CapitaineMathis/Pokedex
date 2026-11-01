const path = require('path');
const fs = require('fs');

exports.default = ['/pokemons/:id', async (req, res, next) => {
    const rawId = req.params.id;

    // Si ce n'est pas un nombre, on passe à la route suivante (findOneByName)
    if (!/^\d+$/.test(rawId)) {
        return next();
    }

    const POKEDEX_SRC = "../DATA/pokedex.json";
    const id = parseInt(rawId, 10)-1;

    if (isNaN(id) || !/^\d+$/.test(rawId)) {
        return res.status(400).json({ error: "The ID need to be a number." });
    }

    const filePath = path.join(__dirname, POKEDEX_SRC);
    const pokedex = JSON.parse(fs.readFileSync(filePath));

    if (id < 0 || id >= pokedex.length) {
        return res.status(404).json({ error: `Pokemon not found` });
    }
    
    res.send(pokedex[id]);

}];