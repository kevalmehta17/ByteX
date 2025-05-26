import express from "express";
import { Login, Logout, Onboarding, Signup } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout)

router.post("/onboarding", ProtectRoute, Onboarding);

// check if the user is logged in
router.get("/me", ProtectRoute, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});
export default router;
