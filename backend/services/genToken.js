import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/env.config.js";

const getToken = (userId) => {
    const token = jwt.sign({ userId }, TOKEN_SECRET, {
        expiresIn: "7d",
    });

    return token;
};

export default getToken;
