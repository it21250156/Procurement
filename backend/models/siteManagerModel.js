const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteManagerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    sitename: {
      type: String,
      required: true,
    },
    siteaddress: {
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

module.exports = mongoose.model('SiteManager', siteManagerSchema);
