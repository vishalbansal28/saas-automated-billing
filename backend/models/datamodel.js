const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  totalDuration: String,
  totalTransactions: Number,
  logins: Number,
  deviceInfo: String,
  location: String,
  featuresUsed: [String],
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
