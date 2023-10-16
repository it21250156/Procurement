const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderRequestsSchema = new Schema(
  {
    sitemanagerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SiteManager',
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
    quantity: {
      type: String,
      required: true,
    },
    orderstatus: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderRequest', orderRequestsSchema);
