const  Info =require("../models/holdinfo");

module.exports.Signup=async(req,res)=>{
    try {
        const info =await Info.create(req.body)
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.SignIn=async(req,res)=>{
    try {
        const info =await Info.findOne({email:req.body.email,password:req.body.password})
        if(info){
            return res.status(200).json(info) 
        }else{
            return res.status(401).json("unotherized") 
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.getAllUsers=async(req,res)=>{
    try {
        
        const info =await Info.find()
        return res.status(200).json(info) 
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.getAllUsersByDepartment=async(req,res)=>{
    try {
        const verifyUser =await Info.findOne({_id:req.body._id,position:"manager"})
        if(verifyUser){
            const info =await Info.find({department:req.body.departmentId})
            return res.status(200).json(info) 
        }else{
            return res.status(401).json("unotherized") 
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.updateDetail=async(req,res)=>{
    try {
        const info =await Info.findOneAndUpdate({_id:req.body.employeeId},req.body)
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.deleteDetail=async(req,res)=>{
    try {
        const info =await Info.findOneAndDelete({_id:req.body.employeeId})
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}