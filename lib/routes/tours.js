const router = require('express').Router();
const Tour = require('../models/Tour');
const weatherman = require('../util/weatherman');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .post('/:id/stops/:stopId/attendance', (req, res, next) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;
        Tour.findOneAndUpdate(
            { '_id': id, 'stops._id': stopId },
            { '$set': { 'stops.$.attendance': attendance } },
            updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    })
    .delete('/:id/stops/:stopId', (req, res, next) => {
        const { id, stopId } = req.params;
        Tour.findOneAndUpdate(
            { _id: id },
            { $pull: { stops: { _id: stopId } } },
            updateOptions)
            // .then(() => res.json({ removed: true }))
            .then(tour => res.json(tour))
            .catch(next);
    })
    .post('/:id/stops', weatherman, (req, res, next) => {
        const { id } = req.params;
        const { location, weather } = req;
        const stop = {
            location: location,
            weather: weather,
        };
        Tour.findByIdAndUpdate(id, { $push: { stops: stop } }, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        const { title, activities, launchDate } = req.body;
        Tour.create({ title, activities, launchDate })
            .then(tour => res.json(tour))
            .catch(next);
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id)
            .then(tour => res.json(tour));
    })
    .get('/', (req, res, next) => {
        const { query } = req;
        Tour.find(query)
            .then(tours => res.json(tours))
            .catch(next);
    });


