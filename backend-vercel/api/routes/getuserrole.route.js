import express from "express";
import {db} from "../config.js";
import authenticateToken from "../middlewares/authenticateToken.js";
const router = express.Router();
router.get("/get-user-role",authenticateToken, async (req, res) => {
    const userId = req.query.userId;
    try {
       const usersSnapShot = await db.collection("users").get();
       const loggedInUser = usersSnapShot.docs.find((doc) => doc.data().uid === userId);
       res.status(200).json({
           message: "success",
           isAdmin: loggedInUser.data().isAdmin
       })
    } catch (error) {
        res.status(500).json({
            message: "Server Error, try again later"
        })
    }
})

export default router