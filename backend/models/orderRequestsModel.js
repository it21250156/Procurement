const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderRequestsSchema = new Schema(
  {
    sitemanagerid: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderRequest', orderRequestsSchema);
