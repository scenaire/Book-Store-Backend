const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookCollectionSchema = new Schema({

    book_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    isHave: {
        type: Boolean,
    },
    isRead: {
        type: Boolean,
    },
    buying_date: {
        type: Date,
    }

}, {
    timestamps: true,
},);

const bookCollection = mongoose.model('bookCollection', bookCollectionSchema);

module.exports = bookCollection;