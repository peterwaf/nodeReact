import express from "express";
import multer from "multer";
import { collection,doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, bucket } from "../config.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
router.patch("/edit/",authenticateToken, upload.single('image'), async (req, res) => {
    const id = req.query.id;
    const { title, content } = req.body;
    const image = req.file;
    if (!id || !title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const blogRef = doc(collection(db, "blogs"), id);
        if (image) {
            const imageRef = ref(bucket, `images/${crypto.randomUUID()}${image.originalname}`);
            const imageUpload = await uploadBytes(imageRef, image.buffer, { contentType: image.mimetype });
            const imageUrl = await getDownloadURL(imageUpload.ref);
            await updateDoc(blogRef, {
                title: title,
                image: imageUrl,
                content: content
            })
        } else {
            await updateDoc(blogRef, {
                title: title,
                content: content
            })
        }
        const blogSnapShot = await getDoc(blogRef);
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