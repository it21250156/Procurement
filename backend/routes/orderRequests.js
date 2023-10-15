const express = require('express');
const {
  getOrderRequests,
  getOrderRequest,
  createOrderRequest,
} = require('../controllers/orderRequestsController');

const router = express.Router();

// GET all order requests
router.get('/', getOrderRequests);

// GET single order request
router.get('/:id', getOrderRequest);

//POST a site manager
router.post('/', createOrderRequest);

// //DELETE a site manager
// router.delete('/:id', deleteSiteManager);

// //UPDATE a site manager
// router.patch('/:id', updateSiteManager);

module.exports = router;
