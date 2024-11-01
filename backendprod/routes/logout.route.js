import express from "express";
import { signOut } from "firebase/auth";
import {auth } from "../config.js";

const router = express.Router();
router.get("/logout", async (req, res) => {
    try {
        await signOut(auth);
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later",
            error: error
        })
    }
})
export default router