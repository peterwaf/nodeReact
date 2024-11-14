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
import getUserRole from "./routes/getuserrole.route.js";
import { onRequest } from "firebase-functions/https";
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
//get user role
app.use("/", getUserRole);
app.get('/ping', (req, res) => res.send('pong'));
//export the app to enable cloud functions if deploying to cloud functionsthem
export const api = onRequest({timeoutSeconds: 540}, app);

// // for local testing use the localhost port
// app.listen(PORT, () => {
//     console.log("Server running on port " + PORT);
// })

//run firebase functions emulator

