const express = require('express');
const app = express();
const aircraftRouter = require('./routes/aircraft');

app.use(express.json());
app.use('/api/aircrafts', aircraftRouter);
app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;
