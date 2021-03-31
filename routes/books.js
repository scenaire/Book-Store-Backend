const router = require('express').Router();
let Book = require('../models/books.models');

router.route('/').get((req, res) => {
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const isbn = req.body.isbn;
    const nameTH = req.body.nameTH;
    const nameEN = req.body.nameEN;
    const type = Number(req.body.type);
    const picturePath = req.body.picturePath;
    const genre = req.body.genre;
    const price = Number(req.body.price);
    const synopsis = req.body.synopsis;
    const author = req.body.author;
    
    const newBook = new Book({
        isbn,
        type,
        nameTH,
        nameEN,
        picturePath,
        genre,
        price,
        synopsis,
        author
    });

    newBook.save()
    .then(() => res.json('Book Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/type/:type').get((req, res) => {
    Book.find({type: req.params.type})
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: + err'));
});

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: + err'));
});

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book Delete.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {

    Book.findById(req.params.id)
    .then(book => {
        const isbn = req.body.isbn;
        const nameTH = req.body.nameTH;
        const nameEN = req.body.nameEN;
        const type = Number(req.body.type);
        const picturePath = req.body.picturePath;
        const genre = req.body.genre;
        const price = Number(req.body.price);
        const synopsis = req.body.synopsis;
        const author = req.body.author;
    
        const newBook = new Book({
            isbn,
            type,
            nameTH,
            nameEN,
            picturePath,
            genre,
            price,
            synopsis,
            author
        });

        newBook.save()
            .then(() => res.json('Book Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
    
});


module.exports = router;