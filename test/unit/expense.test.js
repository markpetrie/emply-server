
const Expense = require('../../lib/models/expense');
const { assert } = require('chai');
const expectedValidation = () => {
    throw new Error('expected validation errors');
};

describe('Expense', () => {
    it('validates good model', () => {
        const expense = new Expense({
            name: 'Printer ink refills',
            amount: 47,
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