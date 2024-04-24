const card = require("../models/cardModel");
const apifeater = require("../utils/apiFeatures");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Center = require("../models/centersModel");
exports.getAllcard = factory.getAllpop1(card, {
  path: "mother_name",
  select: "first_Name last_Name -_id",
});
exports.getcard = factory.getOne(card);
exports.getchildcard = factory.getOne(card, {
  path: "mother_name",
  select: "first_Name last_Name -_id",
});
exports.getAllchildcard =catchAsync( async (req, res, next) => {

  let doc = await card.find()
    .populate({ path: "mother_name", select: "first_Name last_Name -_id" });

  let data = [];
  doc.forEach((item, index) => {
    if (typeof item.mother_name != `undefined`) data.push(item);
  });
  res.status(200).json({
    status: "success",
    rasult: data.length,
    data,
  });
})
exports.getAllm = async (req, res, next) => {
  let doc = await card.find();
  let data = [];
  doc.forEach((item, index) => {
    if (typeof item.mother_name == `undefined`) data.push(item);
  });
  res.status(200).json({
    status: "success",
    rasult: data.length,
    data,
  });
};

exports.createchildren = catchAsync(async (req, res, next) => {
  let docmother = await card.findOne({ card_id: req.body.mother_name });
  let data = { ...req.body };
  data.mother_name = docmother._id;
  data.card_id = await genratorId(req.user.center);
  let doc = await card.create(data);
  res.status(200).json({
    status: "success",
    doc,
  });
});
exports.createcardMother = catchAsync(async (req, res, next) => {
  let data = { ...req.body };
  data.center = req.user;
  data.card_id = await genratorId(req.user.center);
  let doc = await card.create(data);
  res.status(200).json({
    status: "success",
    doc,
  });
});
exports.getmychldren = async (req, res, next) => {
  let doc = await card.find({ mother_name: req.user.card_id });
  res.status(200).json({
    status: "success",
    rasult: doc.length,
    doc,
  });
};
exports.updatecard = factory.updateOne(card);
exports.deletecard = factory.deleteOne(card);
const genratorId = async (center) => {
  let card_id;
  const dataCenter = await Center.findById(center);
  switch (dataCenter.region) {
    case "منطقه صحيه 1": {
      card_id = "10" + "1" + Math.floor(700 + Math.random() * 10000);
      break;
    }
    case "منطقه صحيه 2": {
      card_id = "10" + "2" + Math.floor(700 + Math.random() * 10000);
      break;
    }
    case "منطقه صحيه 3": {
      card_id = "10" + "3" + Math.floor(700 + Math.random() * 10000);
      break;
    }
    case "منطقه صحيه 4": {
      card_id = "10" + "4" + Math.floor(700 + Math.random() * 10000);
      break;
    }
   
  }
  return +card_id;
};
