import { model, Schema, SchemaTypes } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        reciver: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const messageModel = model("Message", messageSchema);

export default messageModel;
