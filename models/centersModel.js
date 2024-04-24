const mongoose = require('mongoose');
const validator = require('validator');
const centersSchema = new mongoose.Schema({
name_center:{
    type:String,
    required:[true,'must be to name center']
},
manger:{
    type:mongoose.Schema.ObjectId,
    ref: "User",
},
address:{
    type:String,
    required:[true,'must be to adress center']   
},

number_Phone: {
    type: String,
    required: [true, 'يجب توفير رقم الهاتف للمركز'],
    validate: {
      validator: function (el) {
        return /^021(\d{7})$/.test(el);
      },
      message: 'الرقم غير صالح!'
    }
  },
region:{
    type:String,
    required:[true,'must be to  region']
}
});

const Center = mongoose.model('Center', centersSchema)

module.exports = Center