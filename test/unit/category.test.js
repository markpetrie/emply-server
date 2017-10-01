
const Category = require('../../lib/models/category');
const { assert } = require('chai');
const expectedValidation = () => {
    throw new Error('expected validation errors');
};

describe('Category', () => {
    it('validates good model', () => {
        const category = new Category({
            name: 'Office Supplies',
            amount: 1000,
            department: 'HR'
        });
        return category.validate();
    });

    it('fails validation with missing field', () => {
        const category = new Category();
        return category.validate()
            .then(expectedValidation, err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
                assert.ok(errors.amount && errors.amount.kind === 'required');
            });
    });
});