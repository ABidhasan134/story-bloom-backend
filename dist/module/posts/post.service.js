import { prisma } from "../../lib/prisma";
const createPost = async (data) => {
    try {
        const result = await prisma.post.create({
            data
        });
        return result;
    }
    catch (error) {
        console.log("error for post creation", error);
        throw error; // ✅ VERY IMPORTANT
    }
};
export const PostService = { createPost };
//# sourceMappingURL=post.service.js.map