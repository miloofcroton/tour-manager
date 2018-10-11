require('dotenv').config();
const weatherman = require('../../lib/util/weatherman');

describe('middleware that uses weather api', () => {

    it('gets the necessary info for a given zip code', done => {

        const req = {
            body: { zip: '97220' }
        };
        let error, called = false;

        const next = err => {
            called = true;
            error = err;

            const expectedLocation = {
                city: 'Portland',
                state: 'OR',
                country: 'US',
                zip: '97220'
            };

            expect(called).toBeTruthy();
            expect(error).toBeUndefined();
            expect(req.stop.location).toEqual(expectedLocation);
            expect(Object.keys(req.stop.weather)).toEqual(['temperature', 'condition', 'windSpeed']);
            expect(req.stop.weather.temperature).toEqual(expect.any(String));
            expect(req.stop.weather.condition).toEqual(expect.any(String));
            expect(req.stop.weather.windSpeed).toEqual(expect.any(String));
            done();
        };
        weatherman(req, null, next);

    });





});

