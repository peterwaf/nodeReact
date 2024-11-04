import express from "express";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
const router = express.Router();
router.get("/loadblog/",authenticateToken, async (req, res) => {
    const id = req.query.id;
    try {
        const blogSnapShot = await getDoc(doc(collection(db, "blogs"), id));
        res.status(200).json({
            message: "success",
            blog: blogSnapShot.data(),
            id: blogSnapShot.id
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

export default router

