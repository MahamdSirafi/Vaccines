const mongoose = require("mongoose");
// const v_v = require("./vaccine-visitModel");
const v_c = require("./vacc-centerModel");
const messag = require("./messagModel");
const vaccli = require("./listvacModel");
const center = require("./centersModel");
const vaccineSchema = new mongoose.Schema(
  {
    current_date: {
      type: Date,
      default: Date.now(),
    },
    next_date: {
      type: Date,
      required: true,
    },
    center: {
      type: mongoose.Schema.ObjectId,
      ref: "Center",
    },
    nurse_name: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    card: {
      type: mongoose.Schema.ObjectId,
      ref: "Card",
    },
    vaccli: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vaccli",
      },
    ],
  },
  { versionKey: false }
);
vaccineSchema.post("save", async (doc) => {
  let thisvaccli;
  //جلب معلومات مركذ لقاح محدد
  let thiscenter = await center.findById(doc.center);
  doc.vaccli.forEach(async (item, index) => {
    //جلب معلومات لقاح محدد
    thisvaccli = await vaccli.findById(item);
    //جلب المستند الخاص بكمية اللقاح معين من مركذ معين
    let ce = await v_c.findOne({
      center: doc.center,
      vacci: item,
    });
    ce.amount--;
    await ce.save();
    if (ce.amount / ce.maxAmount < 0.3) {
      //ارسال رسالة الى المسؤول الاكبر عن انخفاض كمية اللقاح في مركذ ما
      await messag.create({
        messag: `لقد اصبحت كمية اللقاح ${thisvaccli.name}في مركز ${thiscenter.name_center}اصغر من 30  من الكمية المستحقة`,
        user: thiscenter.manger,
      });
    }
    if (ce.amount / ce.maxAmount < 0.7) {
      //ارسال رسالة الى المسؤول الاكبر عن انخفاض كمية اللقاح في مركذ ما
      await messag.create({
        messag: `لقد اصبحت كمية اللقاح ${thisvaccli.name}في مركز ${thiscenter.name_center}اصغر من 70  من الكمية المستحقة`,
        user: thiscenter.manger,
      });
    }
  });
});
const Vaccine = mongoose.model("Vaccine", vaccineSchema);
module.exports = Vaccine;
