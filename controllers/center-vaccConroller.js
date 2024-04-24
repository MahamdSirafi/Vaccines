const center_vacci=require('./../models/vacc-centerModel');
const apifeater=require('../utils/apiFeatures')
const factory=require('../utils/handlerFactory');

exports.getAllcenter_vacci = factory.getAllpop1(
    center_vacci,
   {
    path: "vacci",
    select: "name -_id",
   },
   {
    path:"center",
    select:"name -_id",

   },
    
    );
    exports.getCenter_vacci = factory.getOne(
        center_vacci,
        {
            path: "vacci",
            select: "-_id",
           },
           {
            path:"center",
            select:"name -_id",
        
           },

        );
exports.createCenter_vacci=factory.createOne(center_vacci);

exports.updateCenter_vacci=factory.updateOne(center_vacci)
exports.deleteCenter_vacci=factory.deleteOne(center_vacci)