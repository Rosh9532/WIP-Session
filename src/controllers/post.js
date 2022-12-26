const Post=require("../models/post")

// @route POST/routes/posts
// @desc adds a post
// @params none
// @permission authorized user
exports.addPost=async(req,res)=>{
  const{title,description}=req.body
  const post=new Post({
    Title:title,
    Description:description,
    Author:req.user.id
  })
  post.save((err,data)=>{
    if(data){
        res.status(200).json({
            message:"Successfully Added Post",
            data:data
        })
    }else{
        res.status(400).json({
            message:"Error while adding Post",
            Error:err
        })
    }
  })
}

exports.getPosts=async(req,res)=>{

    const posts = await Post.find({})
    .select("Title Description Likes Author")
    .populate({ path: "Author", select: "_id Name" })
    .exec();

  res.status(200).json({ posts});

//    Post.find((err,data)=>{
//     if(err){
//         res.status(200).json({
//             message:"Unable to fetch posts",
           
//         })
//     }else{
//         res.status(200).json({
//             message:"Successfully Fetched Post",
//             data:data
//         })
//     }

//    })
}

exports.getSpecificPost=async(req,res)=>{
    //explaining also findone
    const id=req.params.id
   Post.findOne({_id:id},(err,data)=>{
    if(err){
        res.status(200).json({
            message:"Unable to fetch post",
           
        })
    }else{
        res.status(200).json({
            message:"Successfully Fetched Post",
            data:data
        })
    }

   })
}


exports.likePost=async(req,res)=>{
  const id=req.params.id
  Post.findOneAndUpdate(
    {_id:id},
    {$inc:{Likes:1}},
    {new:true},
    (err,data)=>{
        if(err){
            res.status(200).json({
                message:"Unable to like the post",
               
            })
        }else{
            res.status(200).json({
                message:"Error while liking",
                data:data
            })
        }
    

    }

  )
}

exports.updateSpecificPost=async(req,res)=>{
  Post.updateOne({_id:req.params.id},{$set:{Title:req.body.title}},{new:true},(err,data)=>{
    if(data){
        res.status(200).json({ status: "ok",data:data });
    }else{
        return res.status(400).json({
            message: "Error while updating",
          }); 
    }
  })
}

exports.deletePost=async(req,res)=>{
    const id=req.params.id
    Post.findOneAndDelete({_id:id},(err,data)=>{
     if(!data){
        return res.status(404).json({
            status: "error",
          }); 
     }else{
        return res.status(200).json({
            status: "Successfully deleted",
          }); 
     }
    })

}



