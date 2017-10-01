const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const tokenService = require('../auth/token-service');
const ensureAuth = require('../auth/ensure-auth')();

function hasEmailAndPassword(req, res, next) {
    const { email, password } = req.body;
    if(!email || !password) {
        return next({
            code: 400,
            error: 'both email and password are required'
        });
    }
    next();
}

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .get('/login', ensureAuth, (req, res, next) => {
        User.findById(req.user.id)
            .select('id')
            .then(user => res.send(user))
            .catch(next);
    })

    .post('/signup', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;
        
        User.exists({ email })
            .then(exists => {
                if(exists) {
                    throw next({
                        code: 400,
                        error: 'this email is already in use'
                    });
                }
                const user = new User({ email });
                user.generateHash(password);
                return user.save();
            })
            .then(user => {
                return Promise.all([
                    user
                ]);
            })
            .then(([user]) => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);
    })
    
    .post('/signin', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;
        
        User.findOne({ email })
            .then(user => {
                if(!user || !user.comparePassword(password)) {
                    throw next({
                        code: 401,
                        error: 'Invalid Login'
                    });
                }
                return user;
            })
            .then(user => {
                return Promise.all([
                    { _id: user._id },
                    tokenService.sign(user)
                ]);
            })
            .then(([user, token]) => res.send({ user ,token }))
            .catch(next);
    });

module.exports = router;