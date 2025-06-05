const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const mongoose = require('./config/database.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Export the app
module.exports = app;