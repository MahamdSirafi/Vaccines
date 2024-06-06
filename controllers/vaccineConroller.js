const vaccine = require("../models/vaccineModel");
const apifeater = require("../utils/apiFeatures");
const card = require("../models/cardModel");
const factory = require("../utils/handlerFactory");
exports.getAllvaccine = factory.getAllpop1(
  vaccine,
  {
    path: "nurse_name",
    select: "name -_id",
  },
  {
    path: "visit",
    select: "name -_id",
  },
  {
    path: "center",
    select: "name_center -_id",
  }
);
exports.getvaccine = factory.getOne(
  vaccine,
  {
    path: "nurse_name",
    select: "name -_id",
  },
  {
    path: "vaccli",
    select: "name -_id",
  },
  {
    path: "center",
    select: "name_center -_id",
  }
);
//ذيارات الام
exports.getmyvaccin = async (req, res, next) => {
  const doc = await vaccine
    .find({ card: req.user.card_id }, { card: 0, nurse_name: 0 })
    .populate({
      path: "vaccli",
      select: "name -_id",
    })
    .populate({
      path: "center",
      select: "name_center -_id",
    })
    .sort("current_date");
  res.status(200).json({
    status: "success",
    rasult: doc.length,
    doc,
  });
};
exports.createvaccine = async (req, res, next) => {
  let doc_card = await card.findOne({ card_id: req.body.card_id });
  let data = { ...req.body };
  data.card = doc_card._id;
  data.nurse_name = req.user._id;
  data.center = req.user.center;
  const doc = await vaccine.create(data);
  res.status(200).json({
    status: "success",
    data,
  });
};
exports.deletevaccine = factory.deleteOne(vaccine);
exports.updatevaccine = factory.updateOne(vaccine);
exports.remamber = async (req, res, next) => {
  let currentDate = new Date();
  let listUsers = await vaccine.aggregate([
    {
      $match: {
        next_date: { $lt: currentDate },
      },
    },
    {
      $sort: {
        next_date: -1,
      },
    },
    {
      $group: {
        _id: "$card",
        latesDate: {
          $first: "$next_date",
        },
      },
    },
  ]);
  res.json({ listUsers });
};
