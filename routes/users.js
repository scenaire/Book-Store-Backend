require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

let User = require('../models/user.model');
let refreshTokens = [];

router.route('/').get((reg, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const beforeEncryptPassword = req.body.password;
    const email = req.body.email;
    const displayName = req.body.displayName;

    bcrypt.hash(beforeEncryptPassword, saltRounds, function(err, password) {
        User({username, password, email, displayName}).save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    });

});

// router.route('/token', (req, res) => {
//     const refreshToken = req.body.token;
//     if (refreshToken == null) {
//         return res.sendStatus(401);
//     }
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.sendStatus(403);
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
//         if (err) {
//             return res.sendStatus(403);
//         } 
//         const accessToken = generateAccessToken({username: user.username});
//         res.json({accessToken: accessToken});
//     });
// });

router.route('/login').post( async (req, res) => {

    const user = await User.findOne({username : req.body.username});
    try {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, (err, accessToken) => {
                res.json({
                    accessToken
                })
            });
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

router.route('/logout').delete((req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}



module.exports = router;