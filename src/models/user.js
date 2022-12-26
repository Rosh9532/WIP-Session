const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    Name:{
       type:String,
       required:true
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    Phone:{
        type:Number,
    }
},{timestamps:true})

//instance methods
userSchema.methods={
    //return true or false
    authenticate:async function(password){
        return await bcrypt.compareSync(password,this.Password)
    }
}


module.exports=mongoose.model("User",userSchema)
//instance