import { Post } from "../../../generated/prisma";
export declare const PostService: {
    createPost: (data: Omit<Post, "id" | "createdAt" | "updatedAt">) => Promise<any>;
};
//# sourceMappingURL=post.service.d.ts.map