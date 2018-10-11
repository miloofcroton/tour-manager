require('dotenv').config();

const weatherService = require('./lib/api/weather-service');

weatherService(97220)
    .then(console.log);
