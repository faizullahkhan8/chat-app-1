import mongoose from "mongoose";
import { MONGO_DB_URI } from "../config/env.config.js";
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log("Connected to database succesfully");
    } catch (error) {
        console.log("[ CONNECT_TO_DB ]", error.message);
    }
};

export default connectToDB;
