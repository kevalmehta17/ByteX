import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const ProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this resource. Please login first."
            })
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token. Please login again."
            });
        }
        // Attach the user ID to the request object for further use
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in ProtectRoute middleware:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}