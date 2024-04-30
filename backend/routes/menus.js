const express = require('express');

const { getMenus, getMenu, addMenu, updateMenu, deleteMenu } = require('../controllers/menus')

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
 *   name: Menus
 *   description: Menus API
 */

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get all menu
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Fetch menu successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   food:
 *                     type: string
 *                   price:
 *                     type: string
 *                   image:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getMenus).post(protect, authorize('admin'), addMenu);
router.route('/:id').get(getMenu).put(protect, authorize('admin'), updateMenu).delete(protect, authorize('admin'), deleteMenu);


module.exports = router;