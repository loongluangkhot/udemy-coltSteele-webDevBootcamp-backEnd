// REQUIRE NPM DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require('method-override');
var flash = require('connect-flash');

// REQUIRE MONGOOSE MODELS
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seed");

// REQUIRE ROUTERS
var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');

// SET UP APP
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

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
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
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