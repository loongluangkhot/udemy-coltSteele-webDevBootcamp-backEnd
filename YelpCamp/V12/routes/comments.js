var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err || !foundCampground) {
           req.flash('error', 'Campground not found!');
           res.redirect('back');
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
      if(err || !foundCampground) {
          req.flash('error', 'Campground not found!');
          res.redirect('back');
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
                            req.flash('success', 'Comment successfully added!');
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
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash('error', 'Campground not found!');
            res.redirect('back');
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err) {
                    console.log(err);
                } else {
                    res.render('comments/edit', {comment: foundComment, campground_id: req.params.id});
                }
            });
        }
    });
});

// UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash('error', 'Campground not found!');
            res.redirect('back');
            console.log(err);
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Comment updated:");
                    console.log(updatedComment);
                    req.flash('success', 'Comment successfully updated!');
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});

//DELETE ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash('error', 'Campground not found!');
            res.redirect('back');
            console.log(err);
        } else {
            Comment.findByIdAndRemove(req.params.comment_id, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Comment successfully deleted!');
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});


module.exports = router;