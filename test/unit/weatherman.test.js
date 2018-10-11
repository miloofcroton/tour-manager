const weatherman = require('../../lib/util/weatherman');

describe('the location/weather setter', () => {

    it('gets the necessary info for a given zip code', () => {

        const zip = 97220;
        const example = {
            weather:
            {
                temperature: '49.3',
                condition: 'Clear',
                windSpeed: '1',
                windDir: 'NNE',
                sunrise: '7:21',
                sunset: '18:31'
            },
            location:
            {
                city: 'Portland',
                state: 'OR',
                country: 'US',
                elevation: '61.9'
            }
        };

        return weatherman(zip)
            .then(res => console.log(res));
    });





});

