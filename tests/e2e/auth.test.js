const db = require('./helpers/db');
const request = db.request;
const { assert } = require('chai');

describe('auth', () => {

    before(db.drop);

    const user = {
        email: 'user@mail.com',
        password: 'abc'
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) => 
            request
                .post(url)
                .send(data)
                .then(
                    () => {
                        throw new Error('status should not be okay');
                    },
                    res => {
                        assert.equal(res.status, code);
                        assert.equal(res.response.body.error, error);
                    }
                );
        
        it('signup requires email', () => {
            return badRequest('/api/auth/signup', { password: 'abc' }, 400, 'both email and password are required');
        });

        it('signup requires password', () => {
            return badRequest('/api/auth/signup', { email: 'abc' }, 400, 'both email and password are required');
        });

        let token = '';

        it('signup', () => {
            return request 
                .post('/api/auth/signup')
                .send(user)
                .then(res => {
                    assert.ok(token = res.body.token);
                    assert.ok(res.body.user._id);
                });
        });

        it('signin', () => {
            return request
                .post('/api/auth/signin')
                .send(user)
                .then(res => {
                    assert.ok(res.body.token);
                });
        });

        it('signin with bad password fails', () => {
            const badUser = {
                email: 'user',
                password: '123'
            };

            return request
                .post('/api/auth/signin')
                .send(badUser)
                .then(
                    () => {throw new Error('status should not be ok');},
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Invalid Login');
                    }
                );
        });

        it('token is invalid', () => {
            return request
                .get('/api/auth/verify')
                .set('Authorization', 'bad token')
                .then(
                    () => { throw new Error('success response not expected');},
                    res => { assert.equal(res.status, 401); }
                );
        });
    });
});