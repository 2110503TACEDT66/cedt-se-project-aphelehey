const express = require('express');
const router = express.Router();

const {checkout} = require('../controllers/transactions')
const {protect,authorize}=require('../middleware/auth');

router.post('/checkout',protect,checkout)
module.exports= router;