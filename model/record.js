const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
 diagnosis: {
  type: String,
  required: true,
 },
 created: {
  type: Date,
  default: Date.now,
 },
 status: {
  type: String,
  required: true,
 },
 userName: {
  type: String,
  required: true,
 },
});

module.exports = mongoose.model("record", recordSchema);
