const router=require("express").Router() 
const  {Signup,SignIn,getAllUsers,getAllUsersByDepartment,updateDetail,deleteDetail }=require("../controller/holdInfoController")
const {createDepartment,getAllDepartment,updateDepartmentName,deleteDepartment}=require("../controller/handleDepartmentController")

router.post("/Signup",Signup)  
router.post("/SignIn",SignIn)  
router.get("/getAllUsers",getAllUsers)   
router.post("/getAllUsersByDepartment",getAllUsersByDepartment)   
router.post("/updateDetail",updateDetail)  
router.post("/deleteDetail",deleteDetail)  


router.post("/createDepartment",createDepartment)  
router.post("/getAllDepartment",getAllDepartment)  
router.post("/updateDepartmentName",updateDepartmentName)   
router.post("/deleteDepartment",deleteDepartment)   

module.exports=router; 