const express=require('express');
const app=express();
require('dotenv').config();
const db=require('./config/mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo');

app.use(express.urlencoded());
app.use(express.json());

app.use(session({
    name: 'CloudZies',
    secret: process.env.SESSION_COOKIE_KEY,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: `mongodb://localhost:27017/${process.env.db}`,
        ttl: 12*60*60
    })
}))

app.use('/api',require('./routes/index'));

app.listen(process.env.PORT,function(err){
    if(err){
        console.log('Error in connecting to server',err);
        return;
    }
    console.log(`Successfully connected to server on port ${process.env.PORT}.`);
});