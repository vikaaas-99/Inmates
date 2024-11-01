import ReviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js"; // Check if the product exists

// Add a review
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.body.userId; // Use userId from req.body set by the auth middleware

        // Verify if the product exists
        const productExists = await productModel.findById(productId);
        if (!productExists) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Validate rating and comment
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ success: false, message: "Comment is required" });
        }

        const review = new ReviewModel({ productId, userId, rating, comment });
        await review.save();

        res.json({ success: true, message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewModel.find({ productId });

        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addReview, getProductReviews };
