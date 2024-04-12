const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
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
    },
    location: {
        type: {
            address: String,
            district: String,
            province: String,
            postalcode: String,
            region: String
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);