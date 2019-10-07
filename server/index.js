const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1234;
const path = require('path');

const auth = require('./auth.js');
const routes = require('./routes.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

// to get a token upon login
app.post('/authenticate', routes.postAuth);

// allow if token is verified
app.post('/calc', auth.ensureToken, routes.postCalc);

app.listen(port,() => console.log(`listening on port ${port}`));