import { Post } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";


const getAllPost =async(payload:{searchValue:string|undefined})=>{
  console.log("getting all post")
  const allPost= await prisma.post.findMany({
    where:{
      title:{
        contains: payload.searchValue,
        mode: "insensitive"
      }
    }
  });
  return allPost;
}
const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  try {
    const result = await prisma.post.create({
      data: {
        ...data,
        authorId: userId,
      },
    });

    return result;
  } catch (error) {
    console.log("error for post creation", error);
    throw error;
  }
};

export const PostService={createPost,getAllPost}