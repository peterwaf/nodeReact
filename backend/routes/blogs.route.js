import express from "express";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogsSnapShot = await getDocs(collection(db, "blogs"));
        const blogs = [];
        blogsSnapShot.forEach((doc) => {
            const blog = doc.data();
            blog.id = doc.id;
            blogs.push(blog);
        });
        res.status(200).json({
            message: "success",
            blogs: blogs
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

export default router