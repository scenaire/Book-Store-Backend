const router = require('express').Router();
let BookCollection = require('../models/bookCollections.model.js');

router.route('/').get((req, res) => {
    BookCollection.find()
    .then(bookcollections => res.json(bookcollections))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:user').get((req, res) => {
    BookCollection.find({username: req.params.user})
    .then(bookcollections => res.json(bookcollections))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const book_id = req.body.book_id;
    const username = req.body.username;
    const isHave = Boolean(req.body.isHave);
    const isRead = Boolean(req.body.isRead);
    const buying_date = Date(req.body.buying_date);
    
    const newCollections = new BookCollection({
        book_id,
        username,
        isHave,
        isRead,
        buying_date
    });

    newCollections.save()
    .then(() => res.json('Collections Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

    BookCollection.findById(req.params.id)
    .then(collection => {
        const book_id = req.body.book_id;
        const username = req.body.username;
        const isHave = Boolean(req.body.isHave);
        const isRead = Boolean(req.body.isRead);
        const buying_date = Date(req.body.buying_date);
    
        const newCollections = new BookCollection({
            book_id,
            username,
            isHave,
            isRead,
            buying_date
        });

        newCollections.save()
        .then(() => res.json('Collections Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;