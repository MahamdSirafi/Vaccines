const Center = require("../models/centersModel");
const card = require("../models/cardModel");
const catchAsync = require("../utils/catchAsync");
exports.sitIdMotherInBody = catchAsync(async (req, res, next) => {
  const mother = await card.findOne({ card_id: req.body.mother_name });
  req.body.mother_name = mother._id;
  next();
});
exports.sitIdMotherInQuery = catchAsync(async (req, res, next) => {
  req.query.mother_name = req.user.card_id;
  next();
});
exports.sitIdCenter = catchAsync(async (req, res, next) => {
  req.body.center = req.user.center;
  next();
});
exports.genratorId = catchAsync(async (req, res, next) => {
  let card_id;
  const dataCenter = await Center.findById(req.user.center);
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
  console.log(card_id);
  req.body.card_id = +card_id;
  next();
});
