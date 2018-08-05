var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/love/:thing", function(req, res) {
    var thing = req.params.thing;
   res.render("love", {thing: thing}); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started...")
});