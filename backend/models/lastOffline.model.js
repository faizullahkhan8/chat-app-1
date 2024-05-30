import { model, Schema, SchemaTypes } from "mongoose";

const lastOfflineSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "users",
    },

    status: {
        type: String,
        enum: ["offline", "online"],
    },

    offlineAt: {
        type: Date,
        default: Date.now,
    },
});

const lastOfflineModel = model("LastOffline", lastOfflineSchema, "LastOffline");

export default lastOfflineModel;
