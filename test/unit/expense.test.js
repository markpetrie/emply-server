
const Expense = require('../../lib/models/expense');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Category = require('../../lib/models/category');
chai.use(chaiHttp);
const { assert } = require('chai');
const app = require('../../lib/app');
const request = chai.request(app);

const expectedValidation = () => {
    throw new Error('expected validation errors');
};

describe('Expense', () => {
    const newCategory = {
        name: 'Office Supplies',
        amount: 1000,
        department: 'HR'
    };

    it('validates good model', () => {
        const expense = new Expense({
            name: 'Printer ink refills',
            amount: 47,
            category: '59b08f3b23d915147077cf1f'
        });
        return expense.validate();
    });

    it('fails validation with missing field', () => {
        const expense = new Expense();
        return expense.validate()
            .then(expectedValidation, err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
                assert.ok(errors.amount && errors.amount.kind === 'required');
            });
    });
});