const router=require('express').Router();
const UserControllers=require('../controllers/user_controllers');

router.post('/auth/sign-up',UserControllers.SignUp);

module.exports=router;