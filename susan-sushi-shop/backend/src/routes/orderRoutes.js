const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

router.post('/add-to-cart', orderController.addToCart);
router.get('/ordered-sushi', orderController.getOrderedSushi);

module.exports = router;