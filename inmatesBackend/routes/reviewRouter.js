import express from "express";
import { addReview, getProductReviews } from "../controllers/reviewController.js";
// Assuming you have an auth middleware
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router();

// Route to add a review (only for logged-in users)
reviewRouter.post("/add", authUser, addReview);

// Route to get all reviews for a specific product
reviewRouter.get("/product/:productId", getProductReviews);

export default reviewRouter;
