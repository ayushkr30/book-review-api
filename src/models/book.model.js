import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        author: {
            type: String
        },
        genre: {
            type: String
        },
        reviews: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    }
);

export const Book = mongoose.model("Book", bookSchema);