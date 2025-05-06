import express from "express";
import { Signup } from "../controllers/auth.controller.js";


const router = express.Router();

router.get("/signup", Signup);

router.get("/login", (req, res) => { });

export default router;