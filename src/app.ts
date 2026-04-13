import express from "express";
const app= express();
app.get("/", (req, res) => {
    res.send("Story Bloom Backend");
})
export default app;
