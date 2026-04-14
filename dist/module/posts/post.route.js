import express from 'express';
import { PostController } from './post.controller';
const router = express.Router();
router.post('/', PostController.createPost);
export const PostRouter = router;
//# sourceMappingURL=post.route.js.map