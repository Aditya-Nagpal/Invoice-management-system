const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String,required: true},
    password: {type: String, required: true},
    invoices: [{type: mongoose.Schema.ObjectId, ref: 'Invoice'}]
},{timestamps: true});

const Users=mongoose.model('User',userSchema);

module.exports=Users;