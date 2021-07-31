const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LyricsSchema = new Schema(
  {
    infinitive: { type: String },
    infinitivo: { type: String },
    pastWord: { type: String },
    pasado: { type: String },
    pastParticiple: { type: String },
    pasadoParticipio: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Dictionary", LyricsSchema);
