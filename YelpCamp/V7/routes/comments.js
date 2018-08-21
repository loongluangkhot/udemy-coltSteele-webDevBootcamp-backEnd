var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("./comments/new", {campground: foundCampground});
       }
    });
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res) {
   // find campground
   Campground.findById(req.params.id, function(err, foundCampground) {
      if(err) {
          console.log(err);
      } else {
            // create comment
            Comment.create(req.body.comment, function(err, createdComment) {
                if(err) {
                    console.log(err);
                } else {
                    // connect comment
                    foundCampground.comments.push(createdComment);
                    foundCampground.save(function(err, savedCampground) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("Comment added successfully");
                            console.log(savedCampground);
                            
                            // redirect to show page
                            res.redirect(`/campgrounds/${savedCampground._id}`);
                        }
                    });
              }
          });
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