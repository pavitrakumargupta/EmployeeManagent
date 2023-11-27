const mongoose = require('mongoose');


const Department= new mongoose.Schema({
    name:String,
    assignedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Employee"}
 } )

const Info=mongoose.model('Department',Department)
module.exports=Info