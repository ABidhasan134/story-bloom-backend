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
export const PostController={createPost}