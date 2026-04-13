import { Request, Response } from "express"
import { PostService } from "./post.service"
import { Post } from "../../../generated/prisma"

const createPost=async(req:Request,res:Response)=>{
    // console.log("create post working",req.body)
    try{
            const result= await PostService.createPost(req.body as Omit<Post,'id'|'createdAt'|'updatedAt'>)
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