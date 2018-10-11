const weatherService = require('../api/weather-service');
const { HttpError } = require('./errors');


module.exports = function weatherOrNot(req, res, next) {

    if(req.body.zip) {
        weatherService(req.body.zip)
            .then(data => {

                req.location = data.location;
                req.weather = data.weather;
                req.location.zip = req.body.zip;
    
                next();
            });
    }
    else {
        const error = new HttpError({
            code: 400,
            message: 'Bad Request: Zip Code Required'
        });
        next(error);
    }
};


