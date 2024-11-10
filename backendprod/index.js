import express from "express";
import cors from "cors";
import addBlog from "./routes/addblog.route.js";
import allBlogs from "./routes/blogs.route.js";
import deleteBlog from "./routes/deleteblog.route.js";
import editBlog from "./routes/edit.route.js";
import loadBlog from "./routes/loadblog.route.js";
import signUp from "./routes/signup.route.js";
import readmore from "./routes/readmore.route.js";
import updateUserRole from "./routes/updateuser.route.js";
const app = express();
app.use(express.json());
app.use(cors());
//set default port to 3000 or any other port you prefer
const PORT = process.env.PORT || 3000;
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
//readmore
app.use("/", readmore);
//update user
app.use("/", updateUserRole);
app.get('/ping', (req, res) => res.send('pong'));

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})

