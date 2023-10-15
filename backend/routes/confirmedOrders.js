const express = require('express');
const router = express.Router();
const {
  getConfirmedOrders,
  createConfirmedOrder,
} = require('../controllers/confirmedOrderController');

//get all
router.get('/', getConfirmedOrders);

//create
router.post('/add', createConfirmedOrder);

module.exports = router;
