import express from "express";
import cors from "cors";
import addBlog from "./routes/addblog.route.js";
import allBlogs from "./routes/blogs.route.js";
import deleteBlog from "./routes/deleteblog.route.js";
import editBlog from "./routes/edit.route.js";
import loadBlog from "./routes/loadblog.route.js";
import signUp from "./routes/signup.route.js";
import login from "./routes/login.route.js";
import logout from "./routes/logout.route.js";
const app = express();
app.use(express.json());
app.use(cors());
//add blog
app.use("/", addBlog);
//get all blogs
app.use("/", allBlogs);
//delete blog
app.use("/", deleteBlog);
//edit blog
app.use("/", editBlog);
//load
app.use("/", loadBlog);
//signup
app.use("/", signUp);
//login
app.use("/", login);
//logout
app.use("/", logout);
app.listen(3000, () => {
    console.log("Server started on port 3000");
})