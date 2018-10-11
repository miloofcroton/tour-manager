const auth = require('../../lib/util/auth');

describe('authentication middleware', () => {
    it('sends back an HttpError if no password provided', () => {
        const authMiddleware = auth();
        const req = {
            query: { password: '1234' }
        };

        let error;
        const next = err => {
            error = err;
        };

        authMiddleware(req, null, next);
        expect(error.code).toEqual(401);
    });

    it('calls next with no error if password is correct', () => {
        const authMiddleware = auth();
        const req = {
            query: { password: 'password' }
        };

        let called = false;
        let error;
        const next = err => {
            called = true;
            error = err;
        };

        authMiddleware(req, null, next);
        expect(called).toBeTruthy();
        expect(error).toBeUndefined();
    });
});
