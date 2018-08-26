var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');

// INDEX ROUTE
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            // console.log(allCampgrounds);
             res.render("./campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res) {
    res.render("./campgrounds/new");
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res) {
    var newName = req.body.name;
    var newImage = req.body.image;
    var newDescription = req.body.description;
    var newAuthor = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: newName, image: newImage, description: newDescription, author: newAuthor};
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log("New campground added:");
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});


// SHOW ROUTE
router.get("/:id", function(req, res) {
   var campgroundId = req.params.id;
   Campground.findById(campgroundId).populate('comments').exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("./campgrounds/show", {campground: foundCampground});
       }
   });
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('User is logged in.')
        return next();
    }
    res.redirect('/login');
}

module.exports = router;