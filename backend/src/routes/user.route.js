import express from "express";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { sendFriendRequest } from "../controllers/user.controller.js";


const router = express.Router();

//Apply ProtectRoute middleware to all routes in this router
app.use(ProtectRoute);

router.get("/", getRecommendedUsers);

router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);



export default router;