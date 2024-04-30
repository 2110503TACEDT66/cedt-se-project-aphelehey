const express = require('express');

const { getPaymentRecords, updatePaymentStatus,getSalesData } = require('../controllers/paymentRecords')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getPaymentRecords).put(protect, updatePaymentStatus);
router.route('/salesData').get(protect,authorize('admin'),getSalesData);

module.exports = router;

/**
   * @swagger
   * components:
   *   schemas:
   *     Order:
   *       type: object
   *       required: 
   *         - user
   *         - food
   *         - payment
   *         - restaurant
   *       properties:
   *         id:
   *           type: string
   *           format: uuid
   *           description: Auto-generated id of the order
   *         user:
   *           type: string
   *           description: id of the user making the order
   *         food:
   *           type: array
   *           description: an array of string containing the foods' names
   *         price:
   *           type: number
   *           description: the total price of the order
   *         payment:
   *           type: boolean
   *           description: payment's status, whether paid or not
   *         location:
   *           $ref: '#/components/schemas/Location'
   *     Location:
   *       type: object
   *       required:
   *         - address
   *         - district
   *         - province
   *         - postalcode
   *         - region
   *       properties:
   *         address:
   *           type: string
   *         district:
   *           type: string
   *         province:
   *           type: string
   *         postalcode:
   *           type: string
   *         region:
   *           type: string         
   * 
   */

  /**
   * @swagger
   * tags:
   *   name: PaymentRecord
   *   description: The system's paymentRecord managing API      
   */

  /**
   * @swagger
   * /paymentRecords:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     summary: return all payment records of a user, or of all users if logged in as admin
   *     tags: [PaymentRecord]
   *     responses: 
   *       200:
   *         description: Successfully retrieved payment records
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Order'
   *       500:
   *         description: Cannot find paymentRecord
   *   put:
   *     security:
   *       - bearerAuth: []
   *     summary: update payment status
   *     tags: [PaymentRecord]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: 
   *               - order
   *             properties:
   *               order:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successfully updated a payment record
   *         content:
   *           application/json:
   *             schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/Order'
   *       404:
   *         description: No paymentRecord with this id was found
   *       500:
   *         description: Cannot update paymentStatus
   */
