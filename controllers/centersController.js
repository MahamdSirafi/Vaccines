const center=require('../models/centersModel')
const apifeater=require('../utils/apiFeatures')
const factory=require('../utils/handlerFactory')
exports.getAllcenter = factory.getAllpop1(
    center,
    {
      path: "manger",
      select: "phone name -_id",
    },
 
   
  );
  exports.getcenter = factory.getOne(
    center,
    {
      path: "manger",
      select: "phone name -_id",
    },
 
  );
exports.updatecenter = factory.updateOne(center);
exports.createcenter = factory.createOne(center);
exports.deletecenter = factory.deleteOne(center);