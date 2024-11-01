import express from "express";
import multer from "multer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config.js";
const upload = multer();
const router = express.Router();
router.post("/signup", upload.none(), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
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