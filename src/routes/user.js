const express=require("express")
const { SignUp, login, profile } = require("../controllers/user")
const { requireSignin } = require("../middlewares/user")
//this router object is use to handle requets
const router=express.Router()
router.post('/signup',SignUp)
router.post('/login',login)
router.get('/profile',requireSignin,profile)
module.exports=router