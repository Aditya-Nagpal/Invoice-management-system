const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const db=require('./config/mongoose');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/api',require('./routes/index'));

app.listen(process.env.PORT,function(err){
    if(err){
        console.log('Error in connecting to server',err);
        return;
    }
    console.log(`Successfully connected to server on port ${process.env.PORT}.`);
});