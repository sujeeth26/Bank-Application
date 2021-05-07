const mongoose=require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tSchema=new mongoose.Schema({
   Userid:{
    type: ObjectId,
    ref: "User",
    required: true
   },
   Receiverid:{
      type: ObjectId,
      ref: "User",
      required: true
     },
   amount:{
     type:Number,
     required:true,
   },
   sname:{
    type:String,
    required:true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  rname:{
    type:String,
    required:true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  }
})

const Transactions = mongoose.model("Transactions", tSchema);
module.exports.Transactions=Transactions;