import messageDto from "../DTO/message.dto.js";
import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { id: reciverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        if (!reciverId || !message || !senderId) {
            return res.status(400).json({ error: "In-complete data" });
        }

        let conversation = await conversationModel.findOne({
            participiants: { $all: [senderId, reciverId] },
        });

        if (!conversation) {
            conversation = new conversationModel({
                participiants: [senderId, reciverId],
            });
        }

        const newMessage = new messageModel({
            sender: senderId,
            reciver: reciverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        // SOCKET IO FUNCTIONALITY GOES HERE
        const reciverSocketId = getReciverSocketId(reciverId);
        console.log(reciverSocketId);

        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({ message: "Message sent succesfull" });
    } catch (error) {
        console.log("[ SEND_MESSAGE ]", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res, next) => {
    try {
        // DESTRUCTURE ID FROM URL PARAMETERS
        const { id: reciverId } = req.params; // SHORT HAND OF [ const id = req.params.id ]

        // THIS ID IS COMING FROM PROTECTED FUNCTION
        const senderId = req.user._id;

        // SEARCHING CONVERSTION W.R.T ABOVE [ID'S]
        const conversation = await conversationModel
            .findOne({
                participiants: { $all: [senderId, reciverId] },
            })
            .populate("messages"); // POPULATE WILL GIVE THE COPLETE OBJECT NOT ONLY ID

        // IF THERE IS NO CONVERSATION JUST RETURNING AN ERROR MESSAGE
        if (!conversation) {
            return res.status(404).json("Conversation not found");
        }

        // INITIALIZING MESSAGES ARRAY OUTSIDE THE SCOPE OF => MAP
        let messages = [];

        // PASS EACH MESSAGE TO DTO AND MAKEING AN ARRAY
        conversation.messages.map((message) => {
            messages = [...messages, new messageDto(message)];
        });

        // FINAL SUCCES RESPONSE
        return res.status(200).json({ messages });
    } catch (error) {
        // DISPLAY THE ERROR ON CONSOLE WITH THE FUNCTION NAME TO EASY DEBUG THE ERROR
        console.log("[ GET_MESSAGES ]", error.message);
        // RETURN ERROR TO CLIENT
        return res.status(500).json({ error: "Internal server error" });
    }
};
