import express from "express";
import multer from "multer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config.js";
const upload = multer();
const router = express.Router();
router.post("/login", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.status(200).json({
            message: "Logged in successfully",
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