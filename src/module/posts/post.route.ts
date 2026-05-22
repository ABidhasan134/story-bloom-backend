import express from "express";
import { PostController } from "./post.controller.js";
import auth, { USERROLE } from "../../middelwares/auth.js";
const router = express.Router();

router.get('/', PostController.getAllPost)

router.post("/", auth(USERROLE.USER), PostController.createPost);

export const PostRouter = router;
