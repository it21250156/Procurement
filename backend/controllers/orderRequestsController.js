const OrderRequest = require('../models/orderRequestsModel');
const mongoose = require('mongoose');

// get all order requests
const getOrderRequests = async (req, res) => {
  const orderrequests = await OrderRequest.find({}).sort({ createdAt: -1 });

  res.status(200).json(orderrequests);
};

// get single site manager
const getOrderRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order request' });
  }

  const orderrequest = await OrderRequest.findById(id);

  if (!orderrequest) {
    return res.status(404).json({ error: 'No such found' });
  }

  res.status(200).json(orderrequest);
};

// create new order request
const createOrderRequest = async (req, res) => {
  const { sitemanagerid, site, item, price } = req.body;

  // add to db
  try {
    const orderRequest = await OrderRequest.create({
      sitemanagerid,
      site,
      item,
      price,
    });
    res.status(200).json(orderRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrderRequests,
  getOrderRequest,
  createOrderRequest,
};
