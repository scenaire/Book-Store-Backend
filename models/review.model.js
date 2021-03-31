const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    book_id: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
},);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;