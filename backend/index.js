import express from "express";
import cors from "cors";
import addBlog from "./routes/addblog.route.js";
import allBlogs from "./routes/blogs.route.js";
import deleteBlog from "./routes/deleteblog.route.js";
import editBlog from "./routes/edit.route.js";
import loadBlog from "./routes/loadblog.route.js"
const app = express();
app.use(express.json());
app.use(cors());
//add blog
app.use("/add", addBlog);
//get all blogs
app.use("/", allBlogs);
//delete blog
app.use("/delete", deleteBlog);
//edit blog
app.use("/edit", editBlog);
//load
app.loadBlog("/loadblog", loadBlog);
app.listen(3000, () => {
    console.log("Server started on port 3000");
})