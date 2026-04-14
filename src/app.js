"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var node_1 = require("better-auth/node");
var post_route_js_1 = require("./module/posts/post.route.js");
var auth_js_1 = require("./lib/auth.js");
var app = (0, express_1.default)();
app.all('/api/auth/*splat', (0, node_1.toNodeHandler)(auth_js_1.auth));
app.use(express_1.default.json());
app.use('/posts', post_route_js_1.PostRouter);
app.get("/", function (req, res) {
    res.send("Story Bloom Backend");
});
exports.default = app;
