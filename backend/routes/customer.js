const express=require('express');
const router=express.Router();
const{getAllCustomers,saveUser,getOneCustomer,getUserById}=require('../controllers/user')

router.param("userId", getUserById);

router.get('/allCustomers',getAllCustomers);
router.get('/oneCustomer/:userId',getOneCustomer);
router.post('/saveUser',saveUser);

module.exports=router;