// REQUIRE MONGOOSE MODELS
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// CREATE MIDDLEWARES
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('User is logged in.');
        return next();
    }
    req.flash('error', 'You need to be logged in!');
    res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err || !foundCampground) {
                req.flash('error', 'Campground not found!');
                res.redirect('back');
                console.log(err);
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', `You don't have the permission for that!`);
                    res.redirect('back');
                }
            }
        });
        
    } else {
        req.flash('error', 'You need to be logged in!');
        res.redirect('/login');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err || !foundComment) {
                req.flash('error', 'Comment not found!');
                res.redirect('back');
                console.log(err);
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                   next();
                } else {
                    req.flash('error', `You don't have the permission for that!`);
                    res.redirect('back');
                }
            } 
        });
    } else {
        req.flash('error', 'You need to be logged in!');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;