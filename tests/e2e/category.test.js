const db = require('./helpers/db');
const request = db.request;
const { assert } = require('chai');

let category = {
    name: 'Office Supplies',
    amount: 200,
    department: 'Product'
};

describe('category', () => {
    before(db.drop);
    let token = null;
    before(() => db.getToken().then(t => token = t));
    
    it('/POST', () => {
        return request
            .post('/api/categories')
            .set('Authorization', token)   
            .send(category)     
            .then(res => res.body)
            .then(category => {
                assert.ok(category._id);
                assert.equal(category.name, 'Office Supplies');
            });
    });

});