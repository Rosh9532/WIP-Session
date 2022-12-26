const jwt=require("jsonwebtoken")
exports.requireSignin=async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        const user=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(user)
        req.user=user
      
    }else{
        res.status(400).json({
            message:"U r not authorized to visit this page"
        })
    }
    next();
}