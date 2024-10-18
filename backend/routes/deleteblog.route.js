import express from "express";
import { deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../config.js";

const route = express.Router();

route.delete("/delete/", async (req, res) => {
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

export default route