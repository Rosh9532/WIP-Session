const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema
exports.SignUp=async(req,res)=>{
    User.findOne({Email:req.body.email},async(err,user)=>{
        if (err || user){
            return res.status(403).json({
                message:"User laready registered "
            })

        }else{
            const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const phone=req.body.phone
    const hashed_password= await bcrypt.hash(password,10)
    const user=new User({
        Name:name,
        Email:email,
        Password:hashed_password,
        Phone:phone
    })

    user.save((err,data)=>{
        if(!err && data){
            res.status(200).json({
                message:"Successfully stored",
                data:data
            })
        }
        else{
            res.status(400).json({
                message:"Error while registering"
            })
        }
    })
            
        }
    })
    
}

exports.login=async(req,res)=>{
    console.log("hello")
    const{email,password}=req.body
    User.findOne({Email:email},async (err,data)=>{
        if(err){
            res.status(400).json({
                message:"User Not Found"
            })
        }
        else{
            const isPassword=await data.authenticate(password)
            console.log(isPassword)
            if(password){
                const token=jwt.sign({id:data._id},process.env.JWT_SECRET,{expiresIn:'1d'})
                res.status(200).json({
                    message:"Successfully LOgged in",
                    data:data,
                    token:token
                })
            }else{
                res.status(200).json({
                    message:"Invalid Passowrd",
                    data:data
                })
            }
        }
    })

}

exports.profile=async(req,res)=>{
    User.findOne({_id:req.user.id},(err,data)=>{
        if(err){
            res.status(400).json({
                message:"User not found"
            })
        }
        else{
            res.status(200).json({
                message:"Hey how r u doing",
                data:data
            })
        }
    })
    
}