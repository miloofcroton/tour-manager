const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();


describe('Tours e2e tests', () => {


    let tours = Array.apply(null, { length: 100 }).map(() => {
        return {
            title: chance.string(),
            activities: [chance.animal(), chance.animal()],
            launchDate: chance.date(),
            stops: [{
                location: {
                    city: chance.city(),
                    state: chance.state(),
                    zip: chance.zip()
                },
                weather: {
                    temperature: chance.string(),
                    condition: chance.string(),
                    windSpeed: chance.string()
                },
                attendance: chance.natural({ min: 1 })
            }]
        };
    });

    let createdTours;

    const createTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });
    beforeEach(() => {
        return Promise.all(tours.map(createTour)).then(toursRes => {
            createdTours = toursRes;
        });
    });

    it('gets all tours on get', () => {
        return request(app)
            .get('/api/tours')
            .then(retrievedTours => {
                createdTours.forEach(createdTour => {
                    expect(retrievedTours.body).toContainEqual(createdTour);
                });
            });
    });

    it('creates a tour on post', () => {

        const data = {
            title: chance.string(),
            activities: [chance.animal(), chance.animal()],
            launchDate: chance.date(),
            stops: [{
                location: {
                    city: chance.city(),
                    state: chance.state(),
                    zip: chance.zip()
                },
                weather: {
                    temperature: chance.string(),
                    condition: chance.string(),
                    windSpeed: chance.string()
                },
                attendance: chance.natural({ min: 1 })
            }]
        };

        return request(app)
            .post('/api/tours')
            .send(data)
            .then(({ body }) => expect(body.title).toEqual(data.title));
    });




});
