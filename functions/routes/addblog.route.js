import express from "express";
import multer from "multer";
import { db, bucket } from "../config.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import authenticateToken from "../middlewares/authenticateToken.js";
router.post("/add",authenticateToken, upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file;
    // if (!image || !title || !content) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    try {
        const file = bucket.file(`images/${image.originalname}`);
        await file.save(image.buffer, {
            metadata: {
                contentType: image.mimetype
            }
        })
        file.makePublic(); // Make the file publicly accessible
        const imageUrl = file.publicUrl();
        //add to database
        await db.collection("blogs").add({
            title: title,
            image: imageUrl,
            content: content,
            createdOn: new Date().toISOString()
        })
        res.status(200).json({
            message: "Blog added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later",
            error: error.message
        })
    }

})

export default router