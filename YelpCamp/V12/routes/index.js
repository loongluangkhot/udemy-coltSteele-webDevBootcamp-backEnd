var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user');
var passport = require('passport');

// LANDING ROUTE
router.get("/", function(req, res) {
   res.render("landing"); 
});

// REGISTER
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}), password, function(err, registeredUser) {
        if(err) {
            console.log(err);
            return res.render('register', {errorMessage: err.message});
        } 
        passport.authenticate('local')(req, res, function() {
            req.flash('success', `You've successfully registered, ${registeredUser.username}!`);
            res.redirect('/campgrounds'); 
        });
    });
});

// LOGIN
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: `Welcome`
    }), function(req, res) {
});

// LOGOUT
router.get('/logout', function(req, res) {
    console.log('Logged out.');
    req.logout();
    req.flash('success', `You've successfully logged out!`);
    res.redirect('/campgrounds');
});


module.exports = router;