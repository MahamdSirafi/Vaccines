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
    select: function () {
      return this.card_type == "child" ? true : false;
    },
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (el) {
        return /(\+963[345689]\d{8}|09[345689]\d{7})/.test(el);
      },
      message: "ادخال رقم هاتف صالح",
    },
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
