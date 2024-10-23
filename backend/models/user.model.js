import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        required: true,
        type: String,
        enum: ["male", "female"],
    },
    profilePicture: {
        type: String,
    },
});

const userModel = model("User", userSchema);

export default userModel;
