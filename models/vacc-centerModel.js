const mongoose = require('mongoose');

const vacc_centerSchema = new mongoose.Schema({
vacci:{
    type:mongoose.Schema.ObjectId,
    ref:"Vaccli",
    required:true
},
center:{
    type:mongoose.Schema.ObjectId,
    ref:"Center",
    required:true
},
amount:{
    type:Number,
    default:0
},
is_Available:{
    type:Boolean,
    default:true
},
maxAmount:{
    type:Number,  
}

});

const Vacc_center = mongoose.model('Vacc_center', vacc_centerSchema)

module.exports = Vacc_center