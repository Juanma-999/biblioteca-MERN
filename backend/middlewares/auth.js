import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({ error: "Authorization token not found"});
    }

    const token = authorization.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const _id = decodedToken._id; // Assuming _id is the correct property in your token
        console.log("Decoded _id:", _id); // Log decoded _id for debugging
        req.user = await User.findById(_id).select("_id");
        if (!req.user) {
            return res.status(401).json({ error: "User not found" });
        }
        next();
    } catch(error) {
        console.error("Token verification error:", error); // Log token verification error
        res.status(401).json({ error: "Unauthorized" });
    }
};

export default auth;