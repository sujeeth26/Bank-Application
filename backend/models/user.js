const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
      trim: true, 
      minlength: 5,
      maxlength: 255
    },
    email:{
        type:String,
       required: true,
       trim: true, 
       minlength: 5,
       maxlength: 255,
       unique:true
    },
    balance:{
        type:Number,
        default:0,
    },
})

const User = mongoose.model("User", userSchema);
module.exports.User=User;