const visit=require("../models/vaccine-visitModel");
const apifeater=require('../utils/apiFeatures')
const factory=require('../utils/handlerFactory')
exports.getAllvisit=factory.getAllpop1(visit,
    {
        path:"vaccine_list",
        select:"name -_id"
    })
    ///rout
    exports.getvisitone=async(req,res,next)=>{
        const doc =await visit.find({_id : {in:req.body.datavist}}).populate(
        {
            path:"vaccine_list",
            select:"name -_id"
        })
    } 
exports.getvisit=factory.getOne(visit)
exports.updatevisit = factory.updateOne(visit);
exports.createvisit = factory.createOne(visit);
exports.deletevisit = factory.deleteOne(visit);