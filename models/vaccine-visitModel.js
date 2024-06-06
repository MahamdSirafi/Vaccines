const mongoose = require("mongoose");

const vaccine_visitSchema = new mongoose.Schema(
  {
    card_type: {
      type: String,
      enum: ["child", "mother"],
      required: true,
    },
    vaccine_list: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vaccli",
      },
    ],
    name_visit: {
      type: String,
      required: true,
    },
    age_child: {
      type: String,

      required: true,
    },
  },
  { versionKey: false }
);

const Vaccine_visitModel = mongoose.model(
  "Vaccine_visitModel",
  vaccine_visitSchema
);

module.exports = Vaccine_visitModel;
