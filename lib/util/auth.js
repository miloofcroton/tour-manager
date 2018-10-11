const { HttpError } = require('./errors');

module.exports = (password = 'password') => {

    return (req, res, next) => {
        const providePassword = req.query.password;
        if(providePassword === password) {
            next();
        } else {
            const httpError = new HttpError({
                code: 401,
                message: 'Forbidden'
            });
            next(httpError);
        }
    };
};
