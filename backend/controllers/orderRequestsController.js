const OrderRequest = require('../models/orderRequestsModel');
const mongoose = require('mongoose');

// get all order requests
const getOrderRequests = async (req, res) => {
  const orderrequests = await OrderRequest.find({})
    .populate('sitemanagerid')
    .sort({ createdAt: -1 });

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
  const { sitemanagerid, site, item, quantity, orderstatus } = req.body;

  // add to db
  try {
    const orderRequest = await OrderRequest.create({
      sitemanagerid,
      site,
      item,
      quantity,
      orderstatus,
    });
    res.status(200).json(orderRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order request' });
  }

  try {
    // Include the updated order status in the request body
    const updatedOrderRequest = await OrderRequest.findByIdAndUpdate(
      id,
      { orderstatus: 'Accepted' }, // Set the order status to 'Accepted'
      { new: true }
    );

    if (!updatedOrderRequest) {
      return res.status(404).json({ error: 'No such order request' });
    }

    res.status(200).json(updatedOrderRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  getOrderRequests,
  getOrderRequest,
  createOrderRequest,
  updateOrderStatus,
};
