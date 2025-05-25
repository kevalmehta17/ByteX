import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {

        if (!email || !password || !fullName) {
            return res.status(400).json({
                message: "Please provide all required fields: email, password, fullName"
            })
        }
        // Check if the password is at least 6 characters long
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            })
        }
        // Check for the format of the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            })
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }
        // Create image URL for the user avatar
        // Generate a random index for the user avatar
        const idx = Math.floor(Math.random() * 100) + 1; // Generate a random index for the user avatar
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`; // Use the random index to get a random avatar

        // Create a new user
        const newUser = await User.create({
            email, password, fullName, profilePic: randomAvatar
        })

        // Create the token for the user
        const token = jwt.sign({
            userId: newUser._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });
        res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days 
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: "strict", // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" // Use secure cookies in production
        });
        res.status(201).json({ success: true, user: newUser });
        console.log("User signed up successfully:- ", newUser);

    } catch (error) {
        console.error("Error during Signup:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }
}
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password"
            })
        }
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        // Check if the password is correct
        // isPasswordValid method checks the password against the hashed password stored in the database
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        // Create the token for the valid user
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });

        // set the token in a cookie
        res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: "strict", // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === "production" // Use secure cookies in production
        })
        // Return the user data without the password
        user.password = undefined;
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const Logout = (res, req) => { }