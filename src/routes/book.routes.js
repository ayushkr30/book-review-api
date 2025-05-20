import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addBook,getAllBooks, getBooksById,searchBooks, } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", authenticate, addBook);
router.get("/", getAllBooks);
router.get("/search/query", searchBooks);
router.get("/:id", getBooksById);

export default router;
