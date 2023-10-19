var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../models/user');

var router = express.Router();

// it is the handler for rendering the login paage.
router.get('/login', function (req, res, next) {
    res.render('index', { title: "Login" });
});

// it specifies how passport is going to use local strategy to store login session locally.
passport.use(new LocalStrategy(function verify(username, password, cb) {
    User.findOne({ username: username }).then(function (user) {
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        if (password !== user.password) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    });
}));

// it is the handler for verifing password.
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/secure',
    failureRedirect: '/login'
}));

// it specifies how passport is serializing session.
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

// it specifies how passport is deserializing session.
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// logout handler.
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;