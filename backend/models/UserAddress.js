const mongoose = require('mongoose');

const UserAddressSchema = new mongoose.Schema({
    userid: {
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