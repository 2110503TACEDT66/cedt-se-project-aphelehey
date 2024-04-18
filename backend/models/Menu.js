const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    food: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Menu', MenuSchema);