/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserAddress:
 *       type: object
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
*/

/**
  * @swagger
  * tags:
  *   name: Address
  *   description: The Addresses managing API
  */

/**
* @swagger
* /userAddresses:
*   get:
*     security:
*       - bearerAuth: []     
*     summary: Get all addresses
*     tags: [Address]
*     responses:
*       '200':
*         description: A list of addresses
*         content:
*           application/json:
*             schema:
*               type: array
*             example:
*               - address: "123 Main St"
*                 district: "Downtown"
*                 province: "Metropolis"
*                 postalcode: "12345"
*                 region: "East"
*               - address: "456 Elm St"
*                 district: "Uptown"
*                 province: "Metropolis"
*                 postalcode: "67890"
*                 region: "West"
*/

/** 
* @swagger
* /userAddresses:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new address
*     tags: [Address]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*               address:
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
*       '201':
*         description: The created address
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
*                       example: "65e691c0d5c38d5b291d311c"
*                     address:
*                       type: object
*                       properties:
*                         address:
*                           type: string
*                           example: "22222"
*                         district:
*                           type: string
*                           example: "5"
*                         province:
*                           type: string
*                           example: "String"
*                         postalcode:
*                           type: string
*                           example: "String"
*                         region:
*                           type: string
*                           example: "String"
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: "2024-04-30T04:11:23.528Z"
*                     __v:
*                       type: number
*                       example: 0
*/

/**
* @swagger
* /userAddresses:
*   delete:
*     security:
*       - bearerAuth: []
*     summary: Delete an address
*     tags: [Address]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*               index:
*                 type: integer
*     responses:
*       '200':
*         description: Address deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                   example: "6618fcc18c0abcf28a438aaf"
*                 user:
*                   type: string
*                   example: "662e63654770501c1f14edfb"
*                 addresses:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       address:
*                         type: string
*                         example: "Pakkret"
*                       district:
*                         type: string
*                         example: "Pakkret"
*                       province:
*                         type: string
*                         example: "Nonthaburi"
*                       postalcode:
*                         type: string
*                         example: "10200"
*                       region:
*                         type: string
*                         example: "Middle"
*                       _id:
*                         type: string
*                         example: "6630c4240ff6a6b311177fdb"
*                 __v:
*                   type: number
*                   example: 0
*/



const express = require('express')

const { getAddresses, postAddress, updateAddress, deleteAddress } = require('../controllers/userAddresses')

const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')

router.route('/').get(protect, getAddresses).post(protect, postAddress).put(protect, updateAddress).delete(protect, deleteAddress);
module.exports = router;