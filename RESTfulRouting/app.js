var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// DB CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{ useNewUrlParser: true });

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// CREATE SEED DATA
// Blog.create({
//   title: "Golden Retriever is any man's best friend",
//   image: "https://images.unsplash.com/photo-1511198009977-c25709c0fac3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=548400e9d989c8564c07c6076625b962&auto=format&fit=crop&w=1050&q=80",
//   body: "They are so cuddly! I just want to hug the shit out of them!"
// });

// Blog.create({
//   title: "A perfect date with your goldie",
//   image: "https://images.unsplash.com/photo-1513420901937-0b9c3ddb6b49?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7ebb2abf2571d53573e1dec54c072a96&auto=format&fit=crop&w=1051&q=80",
//   body: "Every goldie loves to be pampered once in a while!"
// });

// RESTFUL ROUTING
// INDEX ROUTE
app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if(err) {
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
})

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var createdBlog = req.body.blog;
    Blog.create(createdBlog, function(err, addedBlog) {
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) {
           console.log(err);
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
       if(err) {
           console.log(err);
           res.redirect("/blogs");
       } else {
           res.redirect(`/blogs/${req.params.id}`);
       }
    });
});

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("RESTful blog app server started...");
});