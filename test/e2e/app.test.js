require('dotenv').config();

const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();



describe('Tours e2e tests', () => {


    let tours = [
        {
            title: 'Ringling Bros',
            activities: ['Ringling around the rosey', 'Being bros'],
            launchDate: chance.date()
        },
        {
            title: 'Circus Ole Ole Ole Ole',
            activities: ['Running away from bulls', 'Trying not to get gored'],
            launchDate: chance.date()
        },
        {
            title: 'Petting Zoo',
            activities: ['Playing with puppies', 'Getting Instagram likes'],
            launchDate: chance.date()
        }
    ];
    let stop = { zip: 97220 };

    let createdTours;

    const createTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };
    const createStop = tour => {
        return request(app)
            .post(`/api/tours/${tour._id}/stops`)
            .send(stop)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });
    beforeEach(() => {
        return Promise.all(tours.map(createTour))
            .then(toursRes => createdTours = toursRes);
    });
    beforeEach(() => {
        return Promise.all(createdTours.map(createStop))
            .then(stopsRes => createdTours = stopsRes);
    });

    describe('tour tests', () => {

        it('creates a tour', () => {
    
            const data = {
                title: chance.string(),
                activities: [chance.animal(), chance.animal()],
                launchDate: chance.date()
            };
    
            return request(app)
                .post('/api/tours')
                .send(data)
                .then(({ body }) => expect(body.title).toEqual(data.title));
        });
    
        it('gets a tour by id', () => {
            return request(app)
                .get(`/api/tours/${createdTours[0]._id}`)
                .then(({ body }) => expect(body).toEqual(createdTours[0]));
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
                .then(({ body }) => {
                    expect(body).toContainEqual(createdTours[0]);
                });
        });
    });

    describe('stop tests', () => {

        it('creates a stop', () => {

            const stop = { zip: '95693' };
            return request(app)
                .post(`/api/tours/${createdTours[0]._id}/stops`)
                .send(stop)
                .then(({ body }) => expect(body.stops[1].location.zip).toEqual(stop.zip));
        });

        it('updates the attendees for a stop', () => {

            return request(app)
                .post(`/api/tours/${createdTours[0]._id}/stops/${createdTours[0].stops[0]._id}/attendance`)
                .send({ attendance: 100 })
                .then(({ body }) => expect(body.stops[0].attendance).toEqual(100));
                
        });
        
        it('removes a stop', () => {

            const toDelete = createdTours[0].stops[0]._id;
            return request(app)
                .delete(`/api/tours/${createdTours[0]._id}/stops/${toDelete}`)
                .then(({ body }) => expect(body.stops).toEqual([]));

        });

        
    });


});
