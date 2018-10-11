const router = require('express').Router();
const Tour = require('../models/Tour');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .post('/:id/stops', (req, res, next) => {
        const { id } = req.params;
        const { location, weather, attendance } = req.body;
        const stop = {
            location: location,
            weather: weather,
            attendance: attendance
        };
        Tour.findByIdAndUpdate(id, { $push: { stops: stop } }, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);

    })
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
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id)
            .then(tour => res.json(tour));
    });

