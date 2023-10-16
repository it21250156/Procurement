const ConfirmedOrder = require('../models/confirmedOrderModel');
const supplier = require('../models/supplierModel');

// get all
const getConfirmedOrders = async (req, res) => {
  try {
    const confirmedorders = await ConfirmedOrder.find({})
      .populate('supplier')
      .populate('order')
      .sort({
        createdAt: -1,
      });
    res.status(200).json(confirmedorders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch confirmed orders' });
  }
};

// create
const createConfirmedOrder = async (req, res) => {
  try {
    const { supplierId, orderId, orderStatus } = req.body;

    const confirmedOrder = new ConfirmedOrder({
      supplier: supplierId,
      order: orderId,
      orderStatus, // Include the orderStatus field
    });

    await confirmedOrder.save();
    res.json({ message: 'Confirmed order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create confirmed order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    const confirmedOrder = await ConfirmedOrder.findById(orderId);
    if (!confirmedOrder) {
      return res.status(404).json({ error: 'Confirmed order not found' });
    }

    confirmedOrder.orderStatus = newStatus;
    await confirmedOrder.save();

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  getConfirmedOrders,
  createConfirmedOrder,
  updateOrderStatus, 
};
