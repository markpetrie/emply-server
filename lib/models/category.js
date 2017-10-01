
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        enum: ['HR', 'Product', 'Finance', 'Engineering', 'Sales', 'Support', 'Marketing']
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Category', schema);