import ReviewModel from '../models/reviews.js';
import Company from '../models/Company.js';

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { company, email, reviews } = req.body;

        // Check if the company exists
        const companyInfo = await Company.findOne({ name: company });
        if (!companyInfo) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Create and save the new review
        const reviewObj = new ReviewModel({
            company: companyInfo._id,
            email,
            review,
        });
        const savedReview = await reviewObj.save();

        // Update the company with the new review
        const updatedCompany = await Company.findByIdAndUpdate(
            companyInfo._id,
            { $push: { reviews: savedReview._id } },
            { new: true }
        ).populate("reviews");

        res.status(201).json({ company: updatedCompany });
    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ message: "Internal server error while adding review" });
    }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find().populate('company', 'name'); // Populate company name for better context
        res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error while fetching reviews:", error);
        res.status(500).json({ message: "Internal server error while fetching reviews" });
    }
};
