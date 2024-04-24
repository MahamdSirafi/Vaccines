const mongoose = require("mongoose");
const validat = require("validator");
const cardSchema = new mongoose.Schema({
  card_id: {
    type: Number,
    unique: true,
  },
  first_Name: {
    type: String,
    required: true,
  },
  last_Name: {
    type: String,
    required: true,
  },

  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: mongoose.Schema.ObjectId,
    ref: "Card",
  },
  phone: {
    type: String,
    // required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  card_type: {
    type: String,
    enum: ["child", "mother"],
    default: "mother",
  },
  center: {
    type: mongoose.Schema.ObjectId,
    ref: "Center",
  },
});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
