import express from "express";
import multer from "multer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, bucket } from "./config.js";
import cors from "cors";
import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//get all blogs
app.get('/', async (req, res) => {
    try {
        const blogsSnapShot = await getDocs(collection(db, "blogs"));
        const blogs = [];
        blogsSnapShot.forEach((doc) => {
            const blog = doc.data();
            blog.id = doc.id;
            blogs.push(blog);
        });
        res.status(200).json({
            message: "success",
            blogs: blogs
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

//add blog

app.post("/add", upload.single('image'), async (req, res) => {
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
            content: content
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

//delete

app.delete("/delete/", async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const blogRef = doc(collection(db, "blogs"), id);
        await deleteDoc(blogRef);
        res.status(200).json({
            message: "Blog deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
    
})
//edit
app.patch("/edit/", upload.single('image'), async (req, res) => {
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
//load
app.get("/loadblog/",async (req,res)=>{
    const id = req.query.id;
    try {
        const blogSnapShot = await getDoc(doc(collection(db,"blogs"),id));
        res.status(200).json({
            message:"success",
            blog:blogSnapShot.data(),
            id:blogSnapShot.id
        });
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})