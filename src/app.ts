import express from "express";
import { PostRouter } from "./module/posts/post.route";
const app= express();
app.use(express.json())

app.use('/posts',PostRouter)
app.get("/", (req, res) => {
    res.send("Story Bloom Backend");
})
export default app;
