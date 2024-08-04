const express=require("express");
const router=express.Router();

const {register, login, adminLogin,adminRegister}=require("../controllers/authHandler");
const { isAdmin, authMiddleware} = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login",login);
router.post("/login/admin",isAdmin,adminLogin);
// router.post("/adminRegister",adminRegister);

module.exports=router;