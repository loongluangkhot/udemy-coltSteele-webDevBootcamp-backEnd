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

// Set up database
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });

// Add seed data
seedDB();

app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            // console.log(allCampgrounds);
             res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

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

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// add a show page
app.get("/campgrounds/:id", function(req, res) {
   var campgroundId = req.params.id;
   Campground.findById(campgroundId).populate('comments').exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground})
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started...");
});