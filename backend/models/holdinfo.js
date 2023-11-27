const mongoose = require('mongoose');


const Employee= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    position:String,
    department:{require:false,type:mongoose.Schema.Types.ObjectId,ref:"Department"}
} )

const Info=mongoose.model('Employee',Employee)
module.exports=Info