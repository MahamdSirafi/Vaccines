const mongoose = require("mongoose");

const vaccliSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must be to vacci name"],
    },
    Expiry_date: {
      type: Date,
      required: [true, "must be to vacci Expiry-date"],
    },
  },
  { versionKey: false }
);

const Vaccli = mongoose.model("Vaccli", vaccliSchema);

module.exports = Vaccli;
