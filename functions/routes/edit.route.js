import express from "express";
import { db, bucket } from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import formidable from "formidable";

const router = express.Router();

router.patch("/edit/", authenticateToken, async (req, res) => {
    const blogId = req.query.id; // Rename to blogId to avoid conflicts
    const form = formidable({});
    if (!blogId) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }

    form.parse(req, (err, fields, files) => {
        const { title, content} = fields;
        const image = files.image ? files.image[0] : null;

        if (err) {
            console.error("Error during file upload:", err);
            return res.status(500).json({ error: err, message: "Error during file upload" });
        }
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        if (image) {
            const imageFile = bucket.file(`images/${image.originalFilename}`);
            bucket.upload(image.filepath, {
                destination: `images/${image.originalFilename}`,
                metadata: {
                    contentType: image.mimetype
                }
            }).then(() => {
                imageFile.makePublic(); // Make the file publicly accessible
                const imageUrl = imageFile.publicUrl();
                // Add to database
                db.collection("blogs").doc(blogId).update({
                    title: title[0],
                    image: imageUrl,
                    content: content[0],
                    createdOn: new Date().toISOString()
                }).then(async () => {
                    const editedBlogSnapshot = await db.collection("blogs").doc(blogId).get();
                    const blog = {id: editedBlogSnapshot.id,...editedBlogSnapshot.data()};
                    res.status(200).json({
                        message: "Blog updated successfully",
                        imageUrl: imageUrl,
                        blog: blog
                        
                    });
                }).catch((error) => {
                    console.error("Error updating blog:", error);
                    return res.status(500).json({ error: error, message: "Error updating blog" });
                });
            }).catch((error) => {
                console.error("Error during file upload:", error);
                return res.status(500).json({ error: error, message: "Error during file upload" });
            });
        } else {
            db.collection("blogs").doc(blogId).update({
                title: title[0],
                content: content[0],
                createdOn: new Date().toISOString(),
            }).then(async () => {
                const editedBlogSnapshot = await db.collection("blogs").doc(blogId).get();
                const blogToEdit = {id: editedBlogSnapshot.id,...editedBlogSnapshot.data()};
                res.status(200).json({
                    message: "Blog updated successfully",
                    blog: blogToEdit
                });
            }).catch((error) => {
                console.error("Error updating blog:", error);
                return res.status(500).json({ error: error, message: "Error updating blog" });
            });
        }
    });
});

export default router;
