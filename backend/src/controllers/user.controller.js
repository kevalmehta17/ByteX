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

export const sendFriendRequest = async (req, res) => {
    try {
        //myId from the request object
        //recipientId from the request params
        const myId = req.user._id;
        const { id: recipientId } = req.params;

        //prevent sending friend request to self
        if (myId == recipientId) {
            return res.status(400).json({
                message: "you cannot send a friend request to yourself"
            })
        }
        // check if recipient exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({
                message: "Recipient not found"
            })
        }
        // check if recipient is already a friend
        const isAlreadyFriend = recipient.friends.includes(myId);
        if (isAlreadyFriend) {
            return res.status(400).json({
                message: "You are already friends with this user"
            })
        }
        //check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({
                message: "Friend request already exists"
            })
        }
        // If all checks pass, create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(201).json({ friendRequest })
    } catch (error) {
        console.error("Error in sendFriendRequest:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}