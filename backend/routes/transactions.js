/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transactions API
 */

/**
 * @swagger
 * /transactions/checkout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                 required:
 *                   - name
 *                   - address
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *                   required:
 *                     - name
 *                     - price
 *                     - quantity
 *               orderID:
 *                 type: string
 *             required:
 *               - user
 *               - products
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       quantity:
 *                         type: integer
 *                 orderID:
 *                   type: string
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     address:
 *                       type: string
 *                     _id:
 *                       type: string
 *                     __v:
 *                       type: integer
 *                 url:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();

const { checkout, webhook } = require('../controllers/transactions')
const { protect, authorize } = require('../middleware/auth');

router.post('/checkout', protect, checkout)
module.exports = router;