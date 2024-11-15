import express from "express";
import { db } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import formidable from "formidable";
// use modular import instead of require
const router = express.Router();
router.post("/signup", authenticateToken, async (req, res) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ message: "Error during file upload", error: err });
            return;
        }
        const firstName = fields.firstName[0];
        const lastName = fields.lastName[0];
        const email = fields.email[0];
        const userId = fields.userId[0];
        try {
            await db.collection("users").add({
                firstName: firstName,
                lastName: lastName,
                email: email,
                uid: userId,
                isAdmin: false,
                createdAt: new Date(),
            })
            res.status(200).json({
                message: "Sign up successfully"
            })
        } catch (error) {
            res.status(500).json({ message: "Error during sign up", error: error });
        }

    });
});

export default router;