var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/results", function(req, res) {
    var searchStr = req.query.searchStr;
    var url = `http://omdbapi.com/?s=${searchStr}&apikey=thewdb`
    request(url, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var parsedBody = JSON.parse(body);
            res.render("results", {parsedBody: parsedBody});
        }
    });
});

app.get("/search", function(req, res) {
    res.render("search");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie app started...");
})