var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var seedCampgrounds = [
    {
        name: "East Coast Park",
        image:"https://images.unsplash.com/photo-1533484211272-98ffef267e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16cf9ebc30603042e4ef52cef25d6f5b&auto=format&fit=crop&w=600&q=60",
        description: "Very far east!"
    },
    {
        name:"Changi Park",
        image:"https://images.unsplash.com/photo-1533209684549-806e84cb88d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=964815460fc72343e0fb09411be7e087&auto=format&fit=crop&w=600&q=60",
        description: "Very far north!"
    },
    {
        name:"West Coast Park",
        image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60",
        description: "Very far west!"
    }
]

function seedDB() {
    
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Residual campgrounds cleared");
            
            // REMOVE ALL COMMENTS
            Comment.remove({}, function(err) {
                if(err) {
                   console.log(err);
                } else {
                    console.log("Residual comments cleared");
                   
                    // LOOP OVER EACH CAMPGROUND IN SEEED DATA
                    seedCampgrounds.forEach(function(seedCampground) {
                        
                        // CREATE CAMPGROUND
                        Campground.create(seedCampground, function(err, createdCampground) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Campground created");
                                
                                // CREATE COMMENT
                                Comment.create({
                                    text: "I spend most of my weekends chilling at this site with my cute cuddly golden retriever, Russell!",
                                    author: "Joakim Lim"
                                }, function(err, createdComment) {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        
                                        // ADD COMMENT TO CAMPGROUND
                                        createdCampground.comments.push(createdComment);
                                        createdCampground.save(function(err, savedCampground) {
                                            if(err) {
                                                console.log(err);
                                            } else {
                                                console.log("Comment added to campground");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                   
                }
            });
        }
    });
    
}

module.exports = seedDB;