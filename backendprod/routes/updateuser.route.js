import express from "express";
import {db} from "../config.js";
const router = express.Router();
import authenticateToken from "../middlewares/authenticateToken.js";
router.patch("/update-user-role", authenticateToken, async (req, res) => {
    const userId = req.body.userId;
    const isAdmin = Boolean(req.body.isAdmin);
    
    try {
        const userSnapShot = await db.collection("users").get();
        userSnapShot.forEach((doc) => {
            if (doc.data().uid === userId) {
                db.collection("users").doc(doc.id).update({
                    isAdmin: isAdmin
                })
            }
        });
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

export default router