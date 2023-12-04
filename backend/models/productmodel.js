const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  features: {
    type: String,
  },
  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  durationUsed: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
