const router = require('express').Router();
let Review = require('../models/review.model.js');

router.route('/').get((req, res) => {
    Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const book_id = req.body.book_id;
    const review = req.body.review;
    const username = req.body.username;
    
    const newReview = new Review({
        book_id,
        review,
        username
    });

    newReview.save()
    .then(() => res.json('Review Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:book_id').get((req, res) => {
    Review.find({book_id : req.params.book_id})
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: + err'));
});


module.exports = router;