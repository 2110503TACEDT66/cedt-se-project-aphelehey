const express = require('express');

const { getPaymentRecords, updatePaymentStatus } = require('../controllers/paymentRecords')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getPaymentRecords).put(protect, updatePaymentStatus);

module.exports = router;