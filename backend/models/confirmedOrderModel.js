const mongoose = require('mongoose');

const confirmedOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderRequest',
  },
  orderStatus: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('ConfirmedOrder', confirmedOrderSchema);
