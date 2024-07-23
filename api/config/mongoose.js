const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.db}`);

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to database'));

db.once('open',function(){
    console.log('Server connected to database sucessfully.');
});

module.exports=db;