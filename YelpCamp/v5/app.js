// Require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seed");

// Set up env
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Set up database
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });

// Add seed data
seedDB();


// =====================================
// CAMPGROUNDS ROUTING
// =====================================

// LANDING ROUTE
app.get("/", function(req, res) {
   res.render("landing"); 
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
    res.render("./campgrounds/new");
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res) {
    var newName = req.body.name;
    var newImage = req.body.image;
    var newDescription = req.body.description;
    var newCampground = {name: newName, image: newImage, description: newDescription};
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log("New campground added:")
            // console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});


// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
   var campgroundId = req.params.id;
   Campground.findById(campgroundId).populate('comments').exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("./campgrounds/show", {campground: foundCampground})
       }
   });
});


// =====================================
// COMMENTS ROUTING
// =====================================

// NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("./comments/new", {campground: foundCampground});
       }
    });
});

// CREATE ROUTE
app.post("/campgrounds/:id/comments", function(req, res) {
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

// START SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started...");
});