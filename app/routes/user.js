let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const user = require('../models/user');

// connect with our model

router.get('/', (req, res, next) => {
    user.find().then((err, userList) => {
        if (err) {
            return console.error(err);
        }
        else {
            console.log(userList);
        }
    });
});

module.exports = router;