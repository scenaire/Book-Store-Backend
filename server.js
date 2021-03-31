require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect to database --> This is hard code you shouldn't do this
const uri = process.env.URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//connect to model
const bookRouter = require('./routes/books');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/reviews');
const bookCollectionsRouter = require('./routes/bookCollections');

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/bookCollections', bookCollectionsRouter);

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    });
}

//App listen to port 
app.listen(port, () => {
    console.log('Server is running on port: ' +port);
});