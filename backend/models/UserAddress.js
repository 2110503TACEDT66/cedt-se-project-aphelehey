const mongoose = require('mongoose');

const UserAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectID,
        required: [true, 'Please add a name'],
        unique: true,
    },
    addresses: {
        type: [{
            address: String,
            district: String,
            province: String,
            postalcode: String,
            region: String
        }],
    }

}
)

module.exports = mongoose.model('UserAddress', UserAddressSchema);