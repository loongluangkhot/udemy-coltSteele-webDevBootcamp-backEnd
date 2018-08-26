// REQUIRE DEPENDENCIES
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");
var session = require('express-session');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

// REQUIRE ROUTERS
var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');

// SET UP APP
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// SET UP DB
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });

// ADD SEED DATA
// seedDB();

// SET UP PASSPORT FOR AUTH
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

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

// ROUTING
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


// START SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started...");
});