const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    fullname:{
        type: String,
    },
    address:{
        type: String,
    },
    order_id:{
        type: String,
    }
})


module.exports = mongoose.model('Transaction', TransactionSchema)