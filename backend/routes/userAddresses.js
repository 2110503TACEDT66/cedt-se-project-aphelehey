const express = require('express')

const { getAddresses, postAddress, updateAddress, deleteAddress } = require('../controllers/userAddresses')

const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')

router.route('/').get(protect, getAddresses).post(protect, postAddress).put(protect, updateAddress).delete(protect, deleteAddress);
module.exports = router;