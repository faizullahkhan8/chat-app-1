import jwt from "jsonwebtoken";
import tokenModel from "../models/token.model.js";
import { TOKEN_SECRET } from "../config/env.config.js";
import userModel from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res
            .status(401)
            .json({ error: "Un-authurized -> Token not provided" });
    }

    const decoded = jwt.verify(token, TOKEN_SECRET);

    if (!decoded) {
        return res
            .status(401)
            .json({ error: "Un-authorized -> In-valid token" });
    }

    const tokenExists = await tokenModel.findOne({ token });

    if (!tokenExists) {
        return res
            .status(401)
            .json({ error: "Un-authorized -> Token is not verify" });
    }

    const user = await userModel.findOne({ _id: decoded.userId });

    req.user = user;

    next();
};

export default protectedRoute;
