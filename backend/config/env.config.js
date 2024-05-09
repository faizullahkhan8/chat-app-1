import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || "";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const MONGO_DB_URI = process.env.MONGO_DB_URI || "";

export { PORT, TOKEN_SECRET, MONGO_DB_URI };
