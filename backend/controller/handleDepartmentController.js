const  Department =require("../models/dempartment");
const  Info =require("../models/holdinfo");
module.exports.createDepartment=async(req,res)=>{
    try {
        const info =await Department.create(req.body)
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.getAllDepartment=async(req,res)=>{
    try {
        const verifyUser =await Info.findOne({_id:req.body._id,position:"manager"})
        if(verifyUser){
            const info =await Department.find({assignedBy:req.body._id})
            return res.status(200).json(info) 
        }else{
            return res.status(401).json("unotherized") 
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.updateDepartmentName=async(req,res)=>{
    try {
        const info =await Department.findOneAndUpdate({_id:req.body.departmentId},{name:req.body.departmentName})
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}
module.exports.deleteDepartment=async(req,res)=>{
    try {
        const info =await Department.findOneAndDelete({_id:req.body.departmentId})
        return res.status(200).json(info) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something Went Wrong"})
    }
}