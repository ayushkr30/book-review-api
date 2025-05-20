import mongoose from "mongoose";

// DB Connection section
export const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.error("Error connecting MONGODB", error);
        process.exit(1); // 1 == failure and 0 == success
    };
};