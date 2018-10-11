const weatherService = require('../api/weather-service');

module.exports = function weatherOrNot() {

    return (req, res, next) => {

        weatherService(req.body.zip)
            .then(data => {
                    
                const { location, weather } = data;
                    
                req.location = location;
                req.weather = weather;

                next();
            });
    };

};


