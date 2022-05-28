const mongoose = require("mongoose");
const validator = require("validator");

const addressBookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter contact name"],
  },
  email: {
    type: String,
    required: [true, "Enter an e-mail address"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
    maxLength: [50, "Maximum 50 characters are allowed"],
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
    validate:{
      validator:function(v){
        return Math.ceil(Math.log10(v+1))===6;
      },
      message:'Pincode must contain only 6 characters'
    }
  },
});

const Address = mongoose.model("Address", addressBookSchema, "AssignmentVouch");

module.exports = Address;
