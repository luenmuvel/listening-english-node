const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TracksSchema = new Schema({
  eng: String,
  spa: String,
  mStart: Number,
  mEnd: Number,
});

module.exports = model("Tracks", TracksSchema);
