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
           return res.render('register');
       } 
       passport.authenticate('local')(req, res, function() {
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
        failureRedirect: '/login'
    }), function(req, res) {
});

// LOGOUT
router.get('/logout', function(req, res) {
    console.log('Logged out.');
    req.logout();
    res.redirect('/campgrounds');
});


// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        console.log(`User ${req.user} is logged in.`);
        return next();
    }
    res.redirect('/login');
}

module.exports = router;