const express=require("express")
const { addPost, getPosts, getSpecificPost, updateSpecificPost, likePost, deletePost } = require("../controllers/post")
const { requireSignin } = require("../middlewares/user")
const router=express.Router()
router.post('/posts',requireSignin,addPost)
router.get('/posts',getPosts)
router.get('/posts/:id',getSpecificPost)
router.patch('/posts/:id',requireSignin,updateSpecificPost)
router.patch('/posts/:id/like',likePost)
router.delete('/posts/:id',requireSignin,deletePost)

module.exports=router