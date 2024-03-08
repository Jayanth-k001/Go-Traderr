require('dotenv').config();
const express=require('express');
const app=express();
const cors =require('cors');
const cookiParser = require("cookie-parser");
const db=require('./config/dbconnection');
const port=process.env.PORT || 3000;
const router=require('./routes/routes')

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);




app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})
