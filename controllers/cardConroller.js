const card = require("../models/cardModel");
const factory = require("../utils/handlerFactory");
exports.getAllcard = factory.getAllpop1(card, {
  path: "mother_name",
  select: "first_Name last_Name -_id",
});
exports.getcard = factory.getOne(card, {
  path: "mother_name",
  select: "first_Name last_Name -_id",
});
exports.createCard = factory.createOne(card);
exports.updatecard = factory.updateOne(card);
exports.deletecard = factory.deleteOne(card);
