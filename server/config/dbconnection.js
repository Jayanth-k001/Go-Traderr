require('dotenv').config();
const mongoose=require('mongoose');
const mongostring=process.env.Database_URL;
 
mongoose.connect(mongostring);

const database=mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
})

database.once('connected',()=>{
    console.log("Database connected");
})

module.exports=database;