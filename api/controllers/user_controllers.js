const User=require('../models/user');
const jwt=require('jsonwebtoken');

module.exports.SignUp=async (req,res) => {
    const userDetails=req.body;
    console.log(userDetails);
};