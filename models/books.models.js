const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: {type: String, require: true},
    type: {type: Number},
    nameTH: {type: String},
    nameEn: {type: String},
    picturePath: {type: String},
    genre: {type: String},
    price: {type: Number},
    synopsis: {type: String},
    author: {type: String},
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;