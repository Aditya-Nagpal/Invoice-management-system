const router=require('express').Router();

router.use('/user',require('./user'));
router.use('/invoice',require('./invoice'));

module.exports=router;