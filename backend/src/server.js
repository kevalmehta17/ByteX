import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT || 9000

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // This allows frontend to send cookies with requests
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);



app.listen(PORT, () => {
    console.log(`{Server is running on Port ${PORT}}`)
    // connect to MongoDB
    connectDB();
})