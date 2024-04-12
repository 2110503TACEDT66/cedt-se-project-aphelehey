const express = require('express');

const { getOrders, getOrder, addOrder, updateOrder, deleteOrder } = require('../controllers/Orders')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getOrders).post(protect, addOrder);
router.route('/:id').get(protect, getOrder).put(protect, authorize('admin'), updateOrder).delete(protect, authorize('admin', 'user'), deleteOrder);


module.exports = router;