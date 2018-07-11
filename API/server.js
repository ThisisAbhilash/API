const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Helper = require('./Utils/helper');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const allConfig = require('./Config/allConfig');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(allConfig.mongoURL)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    if (allConfig.isAuthEnabled && Helper.notAuthDisabledRoute(allConfig.authDisabledRoute, req.url)) {
        
        var inputToken = req.headers['x-access-token'];
        if (!inputToken) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(inputToken, allConfig.secretKeyJWT, (err, decoded) => {
            if (err) {
                return res.status(401).send({ auth: false, message: 'unauthorized token.' });
            }
            req.userId = decoded.id;
            next();
        });
    }
    else {
        next();
    }

});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Workspace API zone. " });
});

require('./Route/allRoutes')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});