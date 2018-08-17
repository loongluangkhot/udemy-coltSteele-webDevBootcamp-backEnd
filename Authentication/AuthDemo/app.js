var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');

// SET UP ENV
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// SET UP AUTH
app.use(session({
  secret: 'Fly me to the moon',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SET UP DB
mongoose.connect('mongodb://localhost:27017/auth_demo', { useNewUrlParser: true });


// ==========================================
// RESTFUL ROUTES
// ==========================================

app.get('/', function(req, res) {
   res.render('home'); 
});

app.get('/secret', isLoggedIn, function(req, res) {
   res.render('secret'); 
});

// REGISTER GET ROUTE
app.get('/register', function(req, res) {
    res.render('register');
});

// REGISTER POST ROUTE
app.post('/register', function(req, res) {
    // authenticate user
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}), password, function(err, registeredUser) {
        if(err) {
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/secret');
        });
    });
});

// LOGIN GET ROUTE
app.get('/login', function(req, res) {
    res.render('login');
});

// LOGIN POST ROUTE
// include middleware
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,function(req, res) {
});

// LOGOUT ROUTE
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// START SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server started...');
});