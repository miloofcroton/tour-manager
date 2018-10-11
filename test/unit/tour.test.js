const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');
const Chance = require('chance');
const chance = new Chance();

describe('tour model', () => {

    it('validates a good model', () => {
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
        
        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, stops: expect.any(Array), _id: expect.any(Object) });
        expect(jsonTour.stops[0]).toEqual({ ...data.stops[0], _id: expect.any(Object) });
        expect(jsonTour.stops).toHaveLength(1);
    });

    it('title is required', () => {
        const tour = new Tour({
            activities: ['Ringling', 'Being bros'],
            launchDate: Date.now()
        });
        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.title.properties.message).toEqual('Path `title` is required.');
    });






});
