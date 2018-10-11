require('dotenv').config();
const Tour = require('../../lib/models/Tour');
require('../../lib/utils/connect')();

describe('tour model', () => {

    it('creates a new tour in my db', () => {
        return Tour.create({
            title: 'Ringling Bros',
            activities: ['Ringling', 'Being bros'],
            launchDate: Date.now()
        })
            .then(createdTour => {
                expect(createdTour).toHaveProperty('_id');
                expect(createdTour.title).toEqual('Ringling Bros');
                expect(createdTour.activities).toEqual(['Ringling', 'Being bros']);
                expect(createdTour.launchDate).toBeInstanceOf('Date');
            });
    });






});
