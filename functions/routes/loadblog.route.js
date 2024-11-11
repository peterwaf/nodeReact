import express from "express";
import { db } from "../config.js";
const router = express.Router();
router.get("/loadblog/", async (req, res) => {
    const id = req.query.id;
    try {
        const blogSnapShot = await db.collection("blogs").doc(id).get();
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

