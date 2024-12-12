const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  grandTotal: {
    type: Number,
    required: true,
  },
  requests: [requestSchema],
  si: {
    type: Number,
    required: true,
  },
  reportName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  fromUser: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
