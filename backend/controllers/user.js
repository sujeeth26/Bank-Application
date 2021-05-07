const mongoose=require('mongoose');
const { User} = require('../models/user');
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

exports.getAllCustomers =async (req,res)=>{
    const result = await User.find();
    res.send(result);
};

exports.getOneCustomer =async (req,res)=>{
  console.log(req.profile1);
  res.send(req.profile1);
};


exports.saveUser =async (req,res) => {


    const users=await User.findOne({email:req.body.email});
    if(users) return res.status(400).json({error:'user already exists'});

  const customer = new User(req.body);
  customer.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB"
      });
    }
    res.json({
      name: result.name,
      email: result.email,
      balance:0,
      id: result._id
    });
  });
}
