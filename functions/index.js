import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
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
import readmore from "./routes/readmore.route.js";
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
//login
app.use("/", login);
//logout
app.use("/", logout);
//readmore
app.use("/", readmore);

// Export the app as a Cloud Function
export const api = onRequest(app);

// app.listen(PORT, () => {
//     console.log("Server running on port " + PORT);
// })


