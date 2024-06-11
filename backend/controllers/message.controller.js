import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receriverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receriverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receriverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receriverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //SOcket io functionality

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()]); // This will run in parellel
        res.status(201).json({ newMessage });

    } catch (error) {
        console.log("Error in send messsage controller", error.message);
        res.status(500).json({ message: "Internal server error", error: error.essage });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants :{$all:[senderId, userToChatId]}
        }).populate("messages"); // not reference but actual message

        if(!conversation) return res.status(200).json({})

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in fet messsages controller", error.message);
        res.status(500).json({ message: "Internal server error", error: error.essage });
    }
}