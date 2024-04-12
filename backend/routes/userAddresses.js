const express = require('express')

const { getAddresses, postAddress, updateAddress, deleteAddress } = require('../controllers/userAddresses')

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getAddresses).post(protect, postAddress);
router.route('/:id').put(protect, updateAddress).delete(protect, deleteAddress)