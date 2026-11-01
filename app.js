const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8085;

const apiRouter = express.Router();
// init all routes
const routesPath = path.join(__dirname, 'routes');

// {c'est mal fait je devrais séparer la lecture des fichier (routes) et de express.js oups}
fs.readdir(routesPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    // get all routes file
    files.forEach(file => {
        if (file.startsWith("._")) return;

        const routeData = require(path.join(routesPath, file)).default;
        
        if (routeData && Array.isArray(routeData)) {
            const [routePath, handler] = routeData;
            
            apiRouter.all(routePath, handler);
        }
    });

    // add a request limit
    app.use((req, res, next) => {
        if (!limitRequests(req, 10, 60000)) {
            console.log(`Too many requests from IP: ${req}`);
            return res.status(429).json({ message: 'Too many requests. Please try again later.' });
        }
        next();
    });

    // redirect to the right route
    app.use('/api/v1', apiRouter);

    // if not send a 404 error
    app.use((req, res) => {
        res.status(404).type('text/plain').send('404 Not Found');
    });

    // start the app
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});





// function for limitating the request.
function limitRequests(req, maxRequests = 10, timeWindow = 60000) {
    const ip = req.ip; // User IP
    let requestAuthorized = true; // dose the request can go ?
    const currentTime = Date.now(); // timestamp 

    // dict for all the user
    if (!req.app.locals.requestCounts) {
        req.app.locals.requestCounts = {};
    }
    // adding the user IP in the dict
    if (!req.app.locals.requestCounts[ip]) {
        req.app.locals.requestCounts[ip] = [];
    }
    // if the timestamp is too old delet it.
    req.app.locals.requestCounts[ip] = req.app.locals.requestCounts[ip].filter(
        (timestamp) => currentTime - timestamp < timeWindow
    );


    if (req.app.locals.requestCounts[ip].length >= maxRequests) {
        requestAuthorized = false;
    }else{
        // on ajoute le **timestamp** de la requête dans le tableau
        req.app.locals.requestCounts[ip].push(currentTime);
    }

    return requestAuthorized;
}