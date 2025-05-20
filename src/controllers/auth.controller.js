import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {

    const { email, password, name } = req.body;
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists  = await User.findOne({ email });
        if(userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already exists"});
        }

        const hashPassword  = await bcryptjs.hash(password, 10);
        const user = new User({
            name, 
            email,
            password: hashPassword
        });

        await user.save();

        //jwt creation and store
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined // to hide from the getting printed on respone
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
         const user = await User.findOne({ email });

         if(!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials"});
         }

         const isPasswordValid = await bcryptjs.compare(password, user.password);
         
         if(!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password"});
        }

        //jwt 
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ success: true, message: "Logged in successfully",
             user: {
                ...user._doc, password: undefined,
            },
        });

    } catch (error) {
        console.log("Error in Login", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully"});
};


