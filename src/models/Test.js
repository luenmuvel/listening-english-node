const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const childSchema = new Schema({
  name: String,
  age: {
    type: Number,
    default: 0,
  },
});

const parentSchema = new Schema({
  dpto: String,
  city: String,
  country: String,
  children: [childSchema],
});

module.exports = model("Test", parentSchema);
