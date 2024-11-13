import express from "express";
import formidable from "formidable";
import { db, bucket } from "../config.js";
const router = express.Router();
import authenticateToken from "../middlewares/authenticateToken.js";
router.post("/add", authenticateToken, async (req, res) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error during file upload:", err);
          return res.status(500).json({ error: "Error during file upload" });
        }
        if (!fields.title || !fields.content || !files.image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const title = fields.title[0];
        const content = fields.content[0];
        const imageFile = files.image[0];  // Retrieve the uploaded file
        const file = bucket.file(`images/${imageFile.originalFilename}`);
        bucket.upload(imageFile.filepath, {
           destination: `images/${imageFile.originalFilename}`,
           metadata: {
               contentType: imageFile.mimetype
           }
       }).then(() => {
           file.makePublic(); // Make the file publicly accessible
           const imageUrl = file.publicUrl();
           //add to database
           db.collection("blogs").add({
               title: title,
               image: imageUrl,
               content: content,
               createdOn: new Date().toISOString()
           })
           res.status(200).json({
               message: "Blog added successfully",
               imageUrl: imageUrl
           })
       }).catch((error) => {
           console.error("Error uploading file:", error);
           res.status(500).json({ error: "Error uploading file" });
       });
    })
   
})

export default router