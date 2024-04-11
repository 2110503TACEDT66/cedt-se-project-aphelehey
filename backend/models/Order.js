const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    food: {
        type: Array,
        required: true
    },
    price: {
        type: int,
        required: true
    },
    payment: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);