var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var middleware = require('../middleware');

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
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("./campgrounds/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newName = req.body.name;
    var newPrice = req.body.price;
    var newImage = req.body.image;
    var newDescription = req.body.description;
    var newAuthor = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: newName, price: newPrice, image: newImage, description: newDescription, author: newAuthor};
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log("New campground added:");
            console.log(newCampground);
            req.flash('success', 'Campground successfully created!');
            res.redirect("/campgrounds");
        }
    });
});


// SHOW ROUTE
router.get("/:id", function(req, res) {
    var campgroundId = req.params.id;
    Campground.findById(campgroundId).populate('comments').exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash('error', 'Campground not found!');
            res.redirect('back');
            console.log(err);
        } else {
            res.render("./campgrounds/show", {campground: foundCampground});
        }
   });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render('./campgrounds/edit', {campground: foundCampground});
        }
    });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log("Updated campground is:");
            console.log(updatedCampground);
            req.flash('success','Campground successfully updated!');
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    }); 
});

// DESTROY ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Campground successfully deleted!');
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;