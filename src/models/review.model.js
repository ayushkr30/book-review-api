import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        book: {
            type: mongoose.Schema.Types.ObjectId, ref: "Book"
        },
        rating: {
            type: Number, min:1, max: 5
        },
        comment: {
            type: String,
        }
    }
);

export const Review = mongoose.model("Review", reviewSchema);