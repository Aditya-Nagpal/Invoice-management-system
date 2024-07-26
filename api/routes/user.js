const router=require('express').Router();
const UserControllers=require('../controllers/user_controllers');
const middleware=require('../config/middleware');

router.post('/auth/create-user',UserControllers.createUser);
router.post('/auth/create-session',UserControllers.createSession);
router.get('/get-profile',middleware,UserControllers.getProfile);

module.exports=router;