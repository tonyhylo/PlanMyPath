const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myPathSchema = new Schema(
  {
    title: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    itinerary: { type: [String], required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mypath", myPathSchema);
