const mongoose=require('mongoose');
const { User} = require('../models/user');
const {Transactions} = require('../models/transactions');
const formidable = require("formidable");

  exports.getUserById = (req, res, next, id) => { //route.param() method 
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile1 = user;
      next();
    });
  };

  exports.getReceiverById = (req, res, next, id) => { //route.param() method 
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile2 = user;
      next();
    });
  };

exports.doTranx =async (req,res) => {
   
      const Userid=req.body.senderId;
      const Receiverid=req.body.rId;
      sname=req.profile1.name;
      rname=req.profile2.name;
      const amount  = parseInt(req.body.amount);
      console.log(req.body);
  
      if (!amount) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }
        
            if(req.profile1.balance>=amount){
                let tr =new Transactions({Userid,Receiverid,amount,sname,rname});

                tr.save((err, Item) => {
                if (err) {
                    res.status(400).json({
                    error: "Saving item in DB failed"
                    });
                }
            });
    const result= User.findByIdAndUpdate({_id:req.profile2._id},{$set:{balance :req.profile2.balance+parseInt(amount)}},{ new: true, useFindAndModify: false },
        (err, user) => {    //callback is called after updating
          if (err) {
            return res.status(400).json({
              error: "Couldnot update balance"
            });
          }
        });
    const ans= User.findByIdAndUpdate({_id:req.profile1._id},{$set:{balance :req.profile1.balance-parseInt(amount)}},{ new: true, useFindAndModify: false },
        (err, user) => {    //callback is called after updating
          if (err) {
            return res.status(400).json({
              error: "could not update balance"
            });
          }
        });
                
                res.json({tr,error:""});
            }
            else{
                res.status(400).json({
                    error: "Insufficient funds"
                    });
            }

   }


exports.getAllTranx =async (req,res)=>{
    const result = await Transactions.find();
    res.send(result);
};