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
router.get("/new", function(req, res) {
    res.render("./campgrounds/new");
});

// CREATE ROUTE
router.post("/", function(req, res) {
    var newName = req.body.name;
    var newImage = req.body.image;
    var newDescription = req.body.description;
    var newCampground = {name: newName, image: newImage, description: newDescription};
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

module.exports = router;