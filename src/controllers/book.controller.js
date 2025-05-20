import mongoose from "mongoose";
import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";

//POST REQUEST
export const addBook = async(req, res) => {
    try {
          const { title, author, genre, description } = req.body;

          if(!title || !author || !genre ) {
            return res.status(400).json({ success: false, message: "Title, author,and genre are required" });
          }

          const book = new Book({
            title, author, genre, description
          });

          await book.save();

          res.status(201).json({ success: true, message: "Book added", book});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

//GET REQUEST
export const getAllBooks = async (req, res) => {
    try {
        
        const { author, genre, page=1, limit = 10 } = req.query;
        const filter={};

        if(author) {
            filter.author = new RegExp(author, "i");
        }

        if(genre) {
            filter.genre = genre;
        }

        const books = await Book.find(filter).skip((page-1)* limit).limit(Number(limit));

        const count = await Book.countDocuments(filter);

        res.json({ success: true, total: count, books});

    } catch (error) {
        req.status(500).json({ success: false, message: error.message});
    }
};

//GET by :id(Dynamic) REQUEST
export const getBooksById = async(req, res) => {
    try{
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({ succes:false, message: "Invalid book Id"});
        }

        const book = await Book.findById(id);
        if(!book) {
            return res.status(500).json({ succes:false, message: "Book not found"});
        }

        const reviews = await Review.find({ book: id });

        const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0)/ reviews.length).toFixed(1): 0;
        
        res.status(200).json({ succes: true, book, averageRating: avgRating, totalReviews: reviews.length, reviews, });
    }
    catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
};

//GET search  REQUEST
export const searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;

    if (!title && !author) {
      return res.status(400).json({ success: false, message: "Search query required" });
    }

    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };

    const books = await Book.find(query);

    res.status(200).json({ success: true, results: books.length, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



