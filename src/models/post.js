const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    Title:{
        type:String
    },
    Description:{
        type:String
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Likes:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports=mongoose.model("Post",postSchema)