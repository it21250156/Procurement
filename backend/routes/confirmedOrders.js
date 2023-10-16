const express = require('express');
const router = express.Router();
const {
  getConfirmedOrders,
  createConfirmedOrder,
  updateOrderStatus,
} = require('../controllers/confirmedOrderController');

//get all
router.get('/', getConfirmedOrders);

//create
router.post('/add', createConfirmedOrder);

// Update order status
router.post('/updateorderstatus', updateOrderStatus);


module.exports = router;
