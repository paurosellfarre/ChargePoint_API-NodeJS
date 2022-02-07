//Requires
const mongoose = require("mongoose");

//Schema
const chargepointSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 32,
  },
  status: {
    type: String,
    required: true,
    enum: ["ready", "charging", "waiting", "error"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Chargepoint", chargepointSchema);
