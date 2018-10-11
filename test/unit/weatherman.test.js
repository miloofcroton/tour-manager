require('dotenv').config();
const weatherman = require('../../lib/util/weatherman');

describe('the location/weather setter', () => {

    it('gets the necessary info for a given zip code', done => {

        const req = {
            body: { zip: '97220' }
        };
        let error, called = false;

        const next = err => {
            called = true;
            error = err;

            expect(called).toBeTruthy();
            expect(error).toBeUndefined();
            expect(req.location).toEqual(expect.any(Object));
            expect(req.weather).toEqual(expect.any(Object));
            done();
        };
        weatherman(req, null, next);

    });





});

