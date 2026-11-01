const path = require('path');
const fs = require('fs');

// simple fonction (source: internet) pour normaliser une string.
function cleanString(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

exports.default = ['/pokemons/:name', async (req, res, next) => {
    const rawName = req.params.name;
    
    // Si ce n'est pas un nombre, on passe à la route suivante (findOneById)
    if (/^\d+$/.test(rawName)) {
        return next();
    }
    
    const POKEDEX_SRC = "../DATA/pokedex.json";
    const filePath = path.join(__dirname, POKEDEX_SRC);
    const pokedex = JSON.parse(fs.readFileSync(filePath));

    // find le nom dans tout le fichier json.
    const pokemon = pokedex.find(p => Object.values(p.name).map(cleanString).includes(cleanString(rawName)));


    if (!pokemon) {
        return res.status(404).json({ error: `Pokemon not found` });
    }

    res.json(pokemon);

}];