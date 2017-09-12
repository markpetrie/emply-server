
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Expense = require('../models/expense');

router
    .get('/', (req, res, next) => {
        Expense.find(req.query)
            .select('name amount category')
            .lean()
            .then(expenses => {
                if(!expenses) throw {
                    code: 404,
                    error: `no expenses currently exist`
                };
                res.send(expenses);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Expense.findById(id)
            .lean()
            .then(expense => {
                if(!expense) throw {
                    code: 404,
                    error: `expense ${id} does not exist`
                };
                res.send(expense);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, /*, next*/) => {
        Expense.findByIdAndRemove(req.params.id)
            .then(([expense]) => res.send(expense));

            // mongoose bug, no catch for now.
            // .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
            new Expense(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(saved = res.send(saved))
            .catch(next);
    });

    module.exports = router;