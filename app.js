const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8085;

const apiRouter = express.Router();
// init all routes
const routesPath = path.join(__dirname, 'routes');

fs.readdir(routesPath, (err, files) => {
    if (err) {
        console.error("Erreur lors de la lecture du dossier routes:", err);
        return;
    }

    files.forEach(file => {
        if (file.startsWith("._")) return;

        const routeData = require(path.join(routesPath, file)).default;
        
        if (routeData && Array.isArray(routeData)) {
            const [routePath, handler] = routeData;
            
            apiRouter.all(routePath, handler);
        }
    });

    app.use('/api/v1', apiRouter);

    app.use((req, res) => {
        res.status(404).type('text/plain').send('404 Not Found');
    });

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});






