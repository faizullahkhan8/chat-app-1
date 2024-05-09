import userModel from "../models/user.model.js";

export const getUser = async (req, res, next) => {
    try {
        // USER FORM REQ WHICH IS ADDED IN PROTECTED FUNCTION
        const logedInUser = req.user._id;
        // ALL USERS EXCEPT LOGED IN USER
        const users = await userModel.find({ _id: { $ne: logedInUser } });
        // RETURN RESPONSE TO CLIENT
        return res.status(200).json(users);
    } catch (error) {
        // LOG THE ERROR WITH FUNTION NAME FOR ESSAY DEBUG
        console.log("[ GET USER FOR CONVERSATON ]", error.message);
        // RETURN GENERAL RESPONSE IF ERROR IN THE ABOVE LOGIC
        return res.status(500).json("Internal server error");
    }
};
