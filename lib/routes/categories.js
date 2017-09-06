
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Category = require('../models/category');

router
    .get('/', (req, res, next) => {
        Category.find(req.query)
            .select('name', 'department', 'amount')
            .lean()
            .then(categories => res.send(categories))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Category.findById(id)
            .lean()
            .then(category => {
                if(!category) throw {
                    code: 404,
                    error: `category ${id} does not exist`
                };
                res.send(category);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, /*, next*/) => {
        Category.findByIdAndRemove(req.params.id)
            .then(([category]) => res.send(category));

            // mongoose bug, no catch for now.
            // .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
            new Category(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(saved = res.send(saved))
            .catch(next);
    });

    module.exports = router;