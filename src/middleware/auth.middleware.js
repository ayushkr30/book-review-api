import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(400).json({ success: false, message: "Unauthorized: No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(400).json({ success: false, message: "Unauthorised: Invalid token"});
        }
        
           req.user = user;
           next(); // contiue to next function
    } catch (error) {
        res.status(400).json({ success: false, message: "Unauthorised: Token error"});
    }
};
