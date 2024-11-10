import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { db } from "../config.js";

const router = express.Router();

router.delete("/delete/",authenticateToken, async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const blogRef = await db.collection("blogs").doc(id).delete();
        res.status(200).json({
            message: "Blog deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }

})

export default router