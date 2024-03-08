const mongoose = require("mongoose");

const stkSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },   
    totalAmount:{
        type: Number,
        required: true,
    },
    formattedDate:{
        type: String,
        required: true,
    },
    
                  

})

const stockSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    stocks: [stkSchema]
})

const  stkdb=new mongoose.model("stocks", stockSchema);

module.exports = stkdb;