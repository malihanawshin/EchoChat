import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
    try{
        const myId = req.user._id;
        const {id: userToChatId} = req.params;

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        }).sort({ createdAt: 1 }); // sort by createdAt ascending

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessagesByUserId:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const sendMessage = async (req, res) => {
    try{
        const senderId = req.user._id;
        const {id: receiverId} = req.params;
        const {text, image} = req.body;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl = null;
        if(image){
            const uploadedImageUrl = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImageUrl.secure_url;
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            text,
            image: imageUrl,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getChatPartners = async (req, res) => {
    try{
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { sender: myId },
                { receiver: myId }
            ]
        });

        const partnerIdsSet = new Set();
        messages.forEach(msg => {
            if(msg.sender.toString() !== myId.toString()){
                partnerIdsSet.add(msg.sender.toString());
            }
            if(msg.receiver.toString() !== myId.toString()){
                partnerIdsSet.add(msg.receiver.toString());
            }
        });

        const partnerIds = Array.from(partnerIdsSet);
        const partners = await User.find({_id: {$in: partnerIds}}).select('-password');

        res.status(200).json(partners);

    } catch (error) {
        console.log("Error in getChatPartners:", error);
        res.status(500).json({ message: "Server error" });
    }
}