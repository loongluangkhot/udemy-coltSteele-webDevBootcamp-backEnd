// Require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Set up env
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Set up database
mongoose.connect('mongodb://localhost:27017/yelpcamp');
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//         name:"West Coast Park",
//         image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60",
//         description: "Has an awesome ice cream shop nearby!"
//     }, 
//     function(err, newCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("New campground added:")
//             console.log(newCampground);
//         }
//     }
// );

// var campgrounds = [
//     {name: "East Coast Park", image:"https://images.unsplash.com/photo-1533484211272-98ffef267e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16cf9ebc30603042e4ef52cef25d6f5b&auto=format&fit=crop&w=600&q=60"},
//     {name:"Changi Park", image:"https://images.unsplash.com/photo-1533209684549-806e84cb88d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=964815460fc72343e0fb09411be7e087&auto=format&fit=crop&w=600&q=60"},
//     {name:"West Coast Park", image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60"},
//     {name: "East Coast Park", image:"https://images.unsplash.com/photo-1533484211272-98ffef267e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16cf9ebc30603042e4ef52cef25d6f5b&auto=format&fit=crop&w=600&q=60"},
//     {name:"Changi Park", image:"https://images.unsplash.com/photo-1533209684549-806e84cb88d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=964815460fc72343e0fb09411be7e087&auto=format&fit=crop&w=600&q=60"},
//     {name:"West Coast Park", image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60"},
//     {name: "East Coast Park", image:"https://images.unsplash.com/photo-1533484211272-98ffef267e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16cf9ebc30603042e4ef52cef25d6f5b&auto=format&fit=crop&w=600&q=60"},
//     {name:"Changi Park", image:"https://images.unsplash.com/photo-1533209684549-806e84cb88d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=964815460fc72343e0fb09411be7e087&auto=format&fit=crop&w=600&q=60"},
//     {name:"West Coast Park", image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60"},
//     {name: "East Coast Park", image:"https://images.unsplash.com/photo-1533484211272-98ffef267e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16cf9ebc30603042e4ef52cef25d6f5b&auto=format&fit=crop&w=600&q=60"},
//     {name:"Changi Park", image:"https://images.unsplash.com/photo-1533209684549-806e84cb88d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=964815460fc72343e0fb09411be7e087&auto=format&fit=crop&w=600&q=60"},
//     {name:"West Coast Park", image:"https://images.unsplash.com/photo-1533491759193-a5d9abc133d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c5360e7f04e42e29c0cafc5d96a78e77&auto=format&fit=crop&w=600&q=60"}
// ];

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
   Campground.findById(campgroundId, function(err, foundCampground) {
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