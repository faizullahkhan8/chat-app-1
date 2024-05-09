import { Schema, model, SchemaTypes } from "mongoose";

const conversationSchema = new Schema(
    {
        participiants: [
            {
                type: SchemaTypes.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: SchemaTypes.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const conversationModel = model("Conversation", conversationSchema);

export default conversationModel;
