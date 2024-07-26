const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

module.exports.createUser=async (req,res) => {
    const {name,email,password,confirmPassword}=req.body;
    if(password != confirmPassword){
        return res.status(409).json({msg: "Passwords don't match"})
    }
    try {
        let user=await User.findOne({email});
        if(!user){
            user={ name,email,password };
            user.password=await bcryptjs.hash(user.password,10);
            try {
                await User.create(user);
                return res.status(200).json('User successfully signed up.');
            } catch (error) {
                return res.status(500).json({msg: 'Error in signing up user',error});
            }
        } else{
            return res.status(422).json({msg: 'User already exists.'});
        }
    } catch (error) {
        console.log('Error in creating new user',error);
        return res.status(500).json({msg: '******Internal server error******',error})
    }
};

module.exports.createSession=async (req,res) => {
    try {
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(422).json({msg: 'Invalid Email'});
        }else{
            const isMatch=await bcryptjs.compare(password,user.password);
            if(!isMatch){
                return res.status(422).json({msg: 'Invalid password'});
            }
            const token=jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: '2h'});
            return res.status(200).json({msg: 'User successfully signed in. Here is your token. Please keep it safe.',token,user});
        }
    } catch (error) {
        console.log('Error is creating session',error);
        return res.status(500).json({msg: '******Internal server error******',error});
    }
};

module.exports.getProfile=async (req,res) => {
    if(!req.user){
        return res.status(404).json({msg: 'User not found.'});
    }
    return res.status(200).json({user: req.user});
};