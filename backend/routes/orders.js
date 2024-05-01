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
  *   name: Orders
  *   description: The Orders managing API
  */

/**
* @swagger
* /orders:
*   get:
*     security:
*       - bearerAuth: []     
*     summary: Get all orders
*     tags: [Orders]
*     responses:
*       '200':
*         description: A list of orders
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 count:
*                   type: integer
*                   example: 1
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: "66306f6b1a8063cd42355603"
*                       user:
*                         type: string
*                         example: "6618f624ebcf2d9a9686f108"
*                       food:
*                         type: array
*                         items:
*                           type: string
*                         example:
*                           - "water"
*                           - "curry express"
*                       price:
*                         type: integer
*                         example: 400
*                       payment:
*                         type: boolean
*                         example: false
*                       location:
*                         type: object
*                         properties:
*                           address:
*                             type: string
*                             example: "String"
*                           district:
*                             type: string
*                             example: "String"
*                           province:
*                             type: string
*                             example: "String"
*                           postalcode:
*                             type: string
*                             example: "String"
*                           region:
*                             type: string
*                             example: "String"
*                           _id:
*                             type: string
*                             example: "66306f6b1a8063cd42355604"
*                       restaurant:
*                         type: string
*                         example: "65e44c37cb8aa54383faa2d2"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2024-04-30T04:11:23.528Z"
*                       __v:
*                         type: integer
*                         example: 0

* /restaurants/{restaurantId}/orders:
*   parameters:
*     - in: path
*       name: restaurantId
*       required: true
*       schema:
*         type: string

*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new order
*     tags: [Orders]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*               food:
*                 type: array
*                 items:
*                   type: string
*               price:
*                 type: number
*               payment:
*                 type: boolean
*               location:
*                 type: object
*                 properties:
*                   address:
*                     type: string
*                   district:
*                     type: string
*                   province:
*                     type: string
*                   postalcode:
*                     type: string
*                   region:
*                     type: string
*     responses:
*       '200':
*         description: The created order
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 data:
*                   type: object
*                   properties:
*                     user:
*                       type: string
*                       example: "6618f624ebcf2d9a9686f108"
*                     food:
*                       type: array
*                       items:
*                         type: string
*                       example: ["water", "curry express"]
*                     price:
*                       type: number
*                       example: 400
*                     payment:
*                       type: boolean
*                       example: false
*                     location:
*                       type: object
*                       properties:
*                         address:
*                           type: string
*                           example: "String"
*                         district:
*                           type: string
*                           example: "String"
*                         province:
*                           type: string
*                           example: "String"
*                         postalcode:
*                           type: string
*                           example: "String"
*                         region:
*                           type: string
*                           example: "String"
*                         _id:
*                           type: string
*                           example: "66306f6b1a8063cd42355604"
*                     restaurant:
*                       type: string
*                       example: "65e44c37cb8aa54383faa2d2"
*                     _id:
*                       type: string
*                       example: "66306f6b1a8063cd42355603"
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2024-04-30T04:11:23.528Z"
*                     __v:
*                       type: number
*                       example: 0

* /orders/{orderId}:
*   parameters:
*     - in: path
*       name: orderId
*       required: true
*       schema:
*         type: string
*

*   get:
*     security:
*       - bearerAuth: []
*     summary: Get a specific order by ID
*     tags: [Orders]
*     responses:
*       '200':
*         description: The requested order
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 count:
*                   type: integer
*                   example: 1
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: "66306f6b1a8063cd42355603"
*                       user:
*                         type: string
*                         example: "6618f624ebcf2d9a9686f108"
*                       food:
*                         type: array
*                         items:
*                           type: string
*                         example: ["water", "curry express"]
*                       price:
*                         type: number
*                         example: 400
*                       payment:
*                         type: boolean
*                         example: false
*                       location:
*                         type: object
*                         properties:
*                           address:
*                             type: string
*                             example: "String"
*                           district:
*                             type: string
*                             example: "String"
*                           province:
*                             type: string
*                             example: "String"
*                           postalcode:
*                             type: string
*                             example: "String"
*                           region:
*                             type: string
*                             example: "String"
*                           _id:
*                             type: string
*                             example: "66306f6b1a8063cd42355604"
*                       restaurant:
*                         type: string
*                         example: "65e44c37cb8aa54383faa2d2"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2024-04-30T04:11:23.528Z"
*                       __v:
*                         type: number
*                         example: 0
*       '404':
*         description: Order not found
*/

/** 
* @swagger
* /orders/{orderId}:
*   parameters:
*     - in: path
*       name: orderId
*       required: true
*       schema:
*         type: string

*   put:
*     security:
*       - bearerAuth: []
*     summary: Change order
*     tags: [Orders]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*               food:
*                 type: array
*                 items:
*                   type: string
*               price:
*                 type: number
*               payment:
*                 type: boolean
*               location:
*                 type: object
*                 properties:
*                   address:
*                     type: string
*                   district:
*                     type: string
*                   province:
*                     type: string
*                   postalcode:
*                     type: string
*                   region:
*                     type: string
*     responses:
*       '200':
*         description: Change order
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 data:
*                   type: object
*                   properties:
*                     user:
*                       type: string
*                       example: "6618f624ebcf2d9a9686f108"
*                     food:
*                       type: array
*                       items:
*                         type: string
*                       example: ["water", "curry express"]
*                     price:
*                       type: number
*                       example: 400
*                     payment:
*                       type: boolean
*                       example: false
*                     location:
*                       type: object
*                       properties:
*                         address:
*                           type: string
*                           example: "String"
*                         district:
*                           type: string
*                           example: "String"
*                         province:
*                           type: string
*                           example: "String"
*                         postalcode:
*                           type: string
*                           example: "String"
*                         region:
*                           type: string
*                           example: "String"
*                         _id:
*                           type: string
*                           example: "66306f6b1a8063cd42355604"
*                     restaurant:
*                       type: string
*                       example: "65e44c37cb8aa54383faa2d2"
*                     _id:
*                       type: string
*                       example: "66306f6b1a8063cd42355603"
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2024-04-30T04:11:23.528Z"
*                     __v:
*                       type: number
*                       example: 0
*/

const express = require('express');

const { getOrders, getOrder, addOrder, updateOrder, deleteOrder } = require('../controllers/orders')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, getOrders).post(protect, addOrder);
router.route('/:id').get(protect, getOrder).put(protect, updateOrder).delete(protect, authorize('admin', 'user'), deleteOrder);


module.exports = router;
