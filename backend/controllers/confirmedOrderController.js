const ConfirmedOrder = require('../models/confirmedOrderModel');

// get all
const getConfirmedOrders = async (req, res) => {
  try {
    const confirmedorders = await ConfirmedOrder.find({}).sort({
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
    const { supplierId, orderId } = req.body;

    const confirmedOrder = new ConfirmedOrder({
      supplier: supplierId,
      order: orderId,
    });

    await confirmedOrder.save();
    res.json({ message: 'Confirmed order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create confirmed order' });
  }
};

module.exports = {
  getConfirmedOrders,
  createConfirmedOrder,
};
