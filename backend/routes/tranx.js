const express=require('express');
const router=express.Router();

const{doTranx, getReceiverById , getUserById, getAllTranx}=require('../controllers/tranx');

router.param("userId", getUserById);
router.param("receiverId", getReceiverById);

router.post('/tranx/:userId/:receiverId',doTranx);
router.get('/getAllTransactions',getAllTranx);

module.exports=router;