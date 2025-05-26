import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        //take the user ID from the request object
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
            // $ne: not equal
            // $nin: not in
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude the current User
                { _id: { $nin: currentUser.friends } }, // Exclude users who are already friends
                { isOnboarded: true } // Only include users who are onboarded
            ]
        })
        res.status(200).json({
            success: true,
            message: "Recommended users fetched successfully",
            recommendedUsers: recommendedUser
        })

    } catch (error) {
        console.error("Error in getRecommended User:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "friends",
            select: "fullName profilePic nativeLanguage learningLanguage location"
        })

        res.status(200).json({ friends: user.friends })


    } catch (error) {
        console.error("Error in getMyFriends:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

