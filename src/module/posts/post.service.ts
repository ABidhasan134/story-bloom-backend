import { Post } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<Post,'id'|'createdAt'|'updatedAt'>) => {
    try {
        const result = await prisma.post.create({
            data
        })
        return result
    }
    catch(error){
        console.log("error for post creation", error)
        throw error; // ✅ VERY IMPORTANT
    }
}

export const PostService={createPost}