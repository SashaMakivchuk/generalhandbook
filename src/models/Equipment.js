const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  how_much: { type: Number, required: true },
  creation_year: { type: Number, required: true },
  price_usd: { type: Number, required: true },
  period_of_operation: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
