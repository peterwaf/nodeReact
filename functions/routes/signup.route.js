import express from "express";
import multer from "multer";
import { db } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
// use modular import instead of require
const upload = multer();
const router = express.Router();
router.post("/signup",authenticateToken, upload.none(), async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = req.user; // Access `user` data from `req.user`
        if (!user) {
            return res.status(400).json({ message: "User data not found. Ensure authentication is complete." });
        }
        // Add user data to the Firestore
        await db.collection("users").add({
                firstName: firstName,
                lastName: lastName,
                email: email,
                uid: user.user_id,
                createdAt: new Date().toISOString(),
                isAdmin: false
        })

        res.status(200).json({
            message: `Account ${user.email} created successfully`,
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later",
            error: error.message || error
        });
    }
});

export default router;