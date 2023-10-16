const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    companyname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Supplier', supplierSchema);
