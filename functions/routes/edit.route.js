import express from "express";
import multer from "multer";
import { db, bucket } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
router.patch("/edit/", authenticateToken, upload.single('image'), async (req, res) => {
    const id = req.query.id;
    const { title, content } = req.body;
    const image = req.file;
    if (!id || !title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const blogRef = await db.collection("blogs").doc(id).get();
        if (image) {
            const imageFile = bucket.file(`images/${image.originalname}`);
            await imageFile.save(image.buffer, {
                metadata: {
                    contentType: image.mimetype
                }
            })
            imageFile.makePublic();
            const imageUrl = imageFile.publicUrl();
            db.collection("blogs").doc(id).update({
                title: title,
                image: imageUrl,
                content: content,
                createdOn: new Date().toISOString()
            })
        } else {
            await db.collection("blogs").doc(id).update({
                title: title,
                content: content
            })
        }
        const blogSnapShot = await db.collection("blogs").doc(id).get();
        res.status(200).json({
            message: "Blog updated successfully",
            blog: {
                ...blogSnapShot.data(),
                id: blogSnapShot.id
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

export default router