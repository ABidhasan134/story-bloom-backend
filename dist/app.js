import express from "express";
import { toNodeHandler } from "better-auth/node";
import { PostRouter } from "./module/posts/post.route.js";
import { auth } from "./lib/auth.js";
const app = express();
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.use('/posts', PostRouter);
app.get("/", (req, res) => {
    res.send("Story Bloom Backend");
});
export default app;
//# sourceMappingURL=app.js.map