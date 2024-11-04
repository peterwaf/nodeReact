import express from "express";
import multer from "multer";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
// use modular import instead of require
const upload = multer();
const router = express.Router();
router.post("/signup", authenticateToken, upload.none(), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        await addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uid: user.uid,
            createdAt: new Date().toISOString(),
            isAdmin: false
        })
        res.status(200).json({
            message: `Account  ${user.email} created successfully`,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later",
            error: error
        })
    }
})

export default router