import { Schema, SchemaTypes, model } from "mongoose";

const tokenSchema = new Schema(
    {
        token: {
            required: true,
            type: String,
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: "users",
            required: true,
        },
    },
    { timestamps: true }
);

const tokenModel = model("Token", tokenSchema);

export default tokenModel;
