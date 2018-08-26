var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("./comments/new", {campground: foundCampground});
       }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
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
                    console.log(`About to associate id and username to comment: ${req.user._id} & ${req.user.username}`);
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    
                    console.log(`createdComment.author is ${createdComment.author}`);
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

// EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/edit', {comment: foundComment, campground_id: req.params.id});
        }
    });
});

// UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            console.log(err);
        } else {
            console.log("Comment updated:");
            console.log(updatedComment);
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    }) 
});

//DELETE ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});


module.exports = router;