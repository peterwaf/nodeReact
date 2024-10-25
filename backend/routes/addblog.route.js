import express from "express";
import multer from "multer";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, bucket } from "../config.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add", upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file;
    if (!image || !title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const imageRef = ref(bucket, `images/${crypto.randomUUID()}${image.originalname}`);
        const imageUpload = await uploadBytes(imageRef, image.buffer, { contentType: image.mimetype });
        const imageUrl = await getDownloadURL(imageUpload.ref);
        //add to database
        const blogPost = await addDoc(collection(db, "blogs"), {
            title: title,
            image: imageUrl,
            content: content,
            createdOn: new Date().toISOString()
        })

        res.status(200).json({
            message: "Blog added successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }

})

export default router