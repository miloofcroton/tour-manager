const router = require('express').Router();
const Tour = require('../models/Tour');

module.exports = router
    .post('/', (req, res, next) => {
        const { title, activities, launchDate, stops } = req.body;
        Tour.create({ title, activities, launchDate, stops })
            .then(tour => res.json(tour))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        const { query } = req;
        Tour.find(query)
            .then(tours => res.json(tours))
            .catch(next);
    });

