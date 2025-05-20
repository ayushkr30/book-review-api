import mongoose from "mongoose";
import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";

//POST REQUEST
export const submitReview = async (req, res) => {
    try {
         const { id: bookId } = req.params;
         const { rating, comment } = req.body;
         const userId = req.user._id;

         if(!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ success: false, message: "Invalid Book Id "});
         }

         const book = await Book.findById(bookId);
         if(!book ) {
            return res.status(404).json({ success: false, message: "Book not found "});
         }

         const existingReview  = await Review.findOne({ book: bookId, user: userId });
         if(existingReview) {
            return res.status(400).json({ success: false, message: "You are already reviewed this book"});
         }

         const review = new Review({ book: bookId, user: userId, rating, comment});
         await review.save();

         res.status(201).json({ success: true, message: "Review Submitted", review});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

//PUT REQUEST
export const updateReview = async(req, res) => {
    try {
        const { id: reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if(!review) {
            return res.status(404).json({ success: false, message: "Review not found"});
        }

        if (!review.user.equals(userId)) {
            return res.status(403).json({ success: false, message: "Not authorized to update this review" });
       }

       review.rating = rating ?? review.rating;
       review.comment = comment ?? review.comment;
       await review.save();
       res.json({ success: true, message: "Review updated", review });
  } catch (err) {
       res.status(500).json({ success: false, message: err.message });
  }
};

//DELETE REQUEST
export const deleteReview = async (req, res) => {
    try {
        const { id: reviewId } = req.params;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        if (!review.user.equals(userId)) {
          return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
        }

        await review.deleteOne();

        res.status(200).json({ success: true, message: "Review deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
};



