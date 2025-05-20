import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { submitReview, updateReview, deleteReview, } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/books/:id/reviews", authenticate, submitReview);
router.put("/reviews/:id", authenticate, updateReview);
router.delete("/reviews/:id", authenticate, deleteReview);

export default router;
