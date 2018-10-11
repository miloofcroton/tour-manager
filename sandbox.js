require('dotenv').config();

const weatherService = require('./lib/util/weather-service');

weatherService(97220)
    .then(console.log);
