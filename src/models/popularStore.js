const mongoose = require("mongoose");

const popularStoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  storeUrl: {
    type: String,
    required: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },

  status: {
    type: Boolean,
    default: true,
  }

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "PopularStore",
  popularStoreSchema
);