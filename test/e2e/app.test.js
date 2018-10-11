const { dropCollection } = require('../util/db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();


describe('Tours e2e tests', () => {

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
