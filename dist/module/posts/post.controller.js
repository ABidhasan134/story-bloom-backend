import { PostService } from "./post.service";
const createPost = async (req, res) => {
    // console.log("create post working",req.body)
    try {
        const result = await PostService.createPost(req.body);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            message: "post creation faild",
            result: error
        });
    }
};
export const PostController = { createPost };
//# sourceMappingURL=post.controller.js.map