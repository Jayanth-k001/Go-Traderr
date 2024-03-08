const mongoose = require("mongoose");

const hisSchema=new mongoose.Schema({
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
    action:{
        type:String,
        required:true,
    }
    
                  

})

const historySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    history: [hisSchema]
})

const  historydb=new mongoose.model("history", historySchema);

module.exports = historydb;