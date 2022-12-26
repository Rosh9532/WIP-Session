const express=require("express");
const mongoose=require("mongoose");
const env=require("dotenv")
env.config()
const app=express();
app.use(express.json())
//route path,callback function
// app.get("/",(req,res)=>{
//     res.send("Welcome to WIP Session")
// })
//routes
const userRoutes=require('./routes/user')
const postRoutes=require('./routes/post')
app.use("/api",userRoutes)
app.use("/api",postRoutes)
//MOGODB CONNECTION
//HOSTURL,OPTIONAL PARAMETR-TO AVOID WARNINGS
mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGO_URL}`,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
   
}).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})

//port number,function
app.listen(4000,console.log("server is listening"))