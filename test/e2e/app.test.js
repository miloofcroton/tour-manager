const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();


describe('Tours e2e tests', () => {


    let tours = [
        {
            title: 'Ringling Bros',
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
        },
        {
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
        },
        {
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
        }
    ];

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
        return Promise.all(tours.map(createTour))
            .then(toursRes => {
                createdTours = toursRes;
            });
    });

    describe('tour tests', () => {

        it('creates a tour', () => {
    
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
    
        it('gets a tour by id', () => {
            return request(app)
                .get(`/api/tours/${createdTours[0]._id}`)
                .then(res => expect(res.body).toEqual(createdTours[0]));
        });
    
        it('gets all tours', () => {
            return request(app)
                .get('/api/tours')
                .then(retrievedTours => {
                    createdTours.forEach(createdTour => {
                        expect(retrievedTours.body).toContainEqual(createdTour);
                    });
                });
        });
    
        it('gets all tours for a query', () => {
            return request(app)
                .get('/api/tours')
                .query({ title: 'Ringling Bros' })
                .then(retrievedTours => {
                    expect(retrievedTours.body).toContainEqual(createdTours[0]);
                });
        });
    });

    describe('stop tests', () => {

        it('creates a stop', () => {

            const data = {
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
            };

            return request(app)
                .post(`/api/tours/${createdTours[0]._id}/stops`)
                .send(data)
                .then(({ body }) => expect(body.stops[1]).toEqual({ ...data, _id: expect.any(String) }));
        });



    });


});
