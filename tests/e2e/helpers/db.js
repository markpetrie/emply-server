const connection = require('mongoose').connection;
const request = require('./request');
const Category = require('../../../lib/models/category');



module.exports = {
    request,
    
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { email: 'test@test.com', password: '123' }) {
        return request.post('/api/auth/signup')
            .send(user)
            .then(res => res.body.token);
    },
    signup(user) {
        return request.post('/api/auth/signup')
            .send(user)
            .then(res => res.body);
    },
    signin(user) {
        return request.post('/api/auth/signin')
            .send(user)
            .then(res => res.body);
    },
    saveCategory(category) {
        let newCategory = new Category(category);
        return newCategory.save();
    },
    saveExpense(expense) {
        let newExpense = new Expense(expense);
        return newExpense.save();
    }
};