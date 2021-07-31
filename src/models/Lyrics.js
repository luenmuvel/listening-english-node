const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TracksSchema = new Schema({
  eng: String,
  spa: String,
  mStart: Number,
  mEnd: Number,
});

const LyricsSchema = new Schema(
  {
    title: { type: String },
    url: { type: String },
    soundName: { type: String },
    lyrics: { type: String },
    tracks: [TracksSchema],
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("Lyrics", LyricsSchema);
