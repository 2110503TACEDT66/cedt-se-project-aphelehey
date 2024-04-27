const express = require('express');

const { getPaymentRecords, updatePaymentStatus,getSalesData } = require('../controllers/paymentRecords')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getPaymentRecords).put(protect, updatePaymentStatus);
router.route('/salesData').get(protect,authorize('admin'),getSalesData);

module.exports = router;