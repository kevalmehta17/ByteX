import { generateStreamToken } from "../lib/stream.js";


export const getStreamToken = async (req, res) => {
    try {
        const token = generateStreamToken(req.user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in getStreamToken:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}