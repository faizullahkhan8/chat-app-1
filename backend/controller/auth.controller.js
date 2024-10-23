import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getToken from "../services/genToken.js";
import tokenModel from "../models/token.model.js";
import fs from "fs";
import { SERVER_PATH } from "../config/env.config.js";

const Register = async (req, res, next) => {
    try {
        // DESTURCRE ALL THESE FORM REQUST BODY SENDED FROM CLIENT SIDE
        const { name, username, gender, password, confirmPassword, picture } =
            req.body;

        // IF ONE OF THEM ARE MISSING THEN RETURN RESPONSE
        if (
            !name ||
            !username ||
            !gender ||
            !password ||
            !confirmPassword ||
            !picture
        ) {
            return res.status(400).json("In-complete data");
        }

        // CHEAK THE USER SELECTED USERNAME IS ALREADY EXISTS OR NOT
        const isUsernameExists = await userModel.findOne({ username });

        if (isUsernameExists) {
            return res.status(400).json("Username already taken");
        }

        // CHEAKE PASSWORD WITH CONFIRM PASSWORD
        if (password !== confirmPassword) {
            return res.status(400).json("Confirm password does't match");
        }

        // CHEAK THE LENGTH OF PASSWORD
        if (password.length < 6) {
            return res.status(400).json("password must be 6 charactor");
        }

        // GENERATE REANDOM ALPHABATES,NUMS AND SPECIAL CHARACTERS => LIKE AKSD4324;52H*3K;LJ!&^%#52,52M/4.524^5L2
        const salt = await bcrypt.genSalt(10);

        // HASHING PASSWORD WITH THE GENERETED REANDOM SALTES
        const hashedPassword = await bcrypt.hash(password, salt);

        // READ PROFILE PICTURE AS BUFFER
        const profileImage = new Buffer.from(
            picture.replace(/^data:image\/(jpeg|jpg|png);base64,/, ""),
            "base64"
        );

        const profileImagePath = `${Date.now()}-${username}.png`;

        fs.writeFileSync(`backend/storage/${profileImagePath}`, profileImage);

        // CREATE THE OBJECT OF USER INFO
        const userToRegister = new userModel({
            name,
            username,
            gender,
            password: hashedPassword,
            profilePicture: `${SERVER_PATH}/backend/storage/${profileImagePath}`,
        });

        // SAVE THE ABOVE OBJECT IN DB
        await userToRegister.save();

        // GENERATE TOKEN THROUGH [ JSON_WEB_TOKEN ] LIBRARY
        const token = getToken(userToRegister._id);

        // SET COOKIES TO CLIENT SIDE
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        });

        // STORE TOKEN AND USER_ID IN DB
        await tokenModel.create({ token, userId: userToRegister._id });

        // SEND FINAL RESPONSE TO CLIENT
        return res.status(201).json({
            _id: userToRegister._id,
            name: userToRegister.name,
            username: userToRegister.username,
            gender: userToRegister.gender,
            isAuth: true,
        });
    } catch (error) {
        // LOG THE  ERROR WITH FUNTION NAME TO EASY TRACK THE ERROR
        console.log("[ REGISTER_CONTROLLER ]", error.message);
        res.status(500).json("Internal server error");
    }
};

const Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json("In-complete data");
        }

        const userExists = await userModel.findOne({ username });

        if (!userExists) {
            return res.status(401).json("Invalid username");
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userExists.password
        );

        if (!passwordMatch) {
            return res.status(401).json("Invalid password");
        }

        const token = getToken(userExists._id);

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true,
        });

        await tokenModel.create({ token, userId: userExists._id });

        return res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            username: userExists.username,
            gender: userExists.gender,
            isAuth: true,
        });
    } catch (error) {
        console.log("[ LOGIN CONTROLLER ]", error.message);
        return res.status(500).json("Internal server error");
    }
};

const Logout = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        await tokenModel.deleteOne({ token });

        res.clearCookie("token");

        return res.status(200).json({ user: null, isAuth: false });
    } catch (error) {
        console.log("[ LOGOUT CONTROLLER ]", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export { Register, Login, Logout };
