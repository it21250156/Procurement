const mongoose = require('mongoose');

const confirmedOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // Reference to the Supplier model
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderRequest', // Reference to the OrderRequest model
  },
});

module.exports = mongoose.model('ConfirmedOrder', confirmedOrderSchema);
