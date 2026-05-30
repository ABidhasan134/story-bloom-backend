import { Request, Response } from "express"
import { Post } from "../../../generated/prisma/index.js"
import { PostService } from "./post.service.js"

const createPost=async(req:Request,res:Response)=>{
    try{
        console.log("create post working",req.user)
        const user=req.user
        if(!user){
            return res.status(400).json({
            message: "Unauthorized",
        })
        }
            const result= await PostService.createPost(req.body,user.id as string)
            res.status(200).json({
    success: true,
    data: result
})
    }catch(error){
        res.status(500).json({
            message: "post creation faild",
            result: error
        })
    }

}

const getAllPost=async(req:Request,res:Response)=>{
    try{
        const {searchValue}= req.query
        console.log(" search value for the all post get", searchValue)
        const searchString= typeof searchValue==='string'?searchValue:undefined;
        const result =await PostService.getAllPost({searchValue:searchString as string});
        return res.status(200).json({
            message:"getting all post from controller",
            result
        })
    }
    catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Failed to get posts",
  });
}
}
export const PostController={createPost,getAllPost}