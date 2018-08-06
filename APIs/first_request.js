var request = require("request");

var oauth = { 
    consumer_key: "	Pfk995zElvsdDH4SzFq7FyXGZ", 
    consumer_secret: "9QXuNmCbArk3hG57nsxNyicFevxzwjjBxdSXzhlGCuDziNLgKk",
    token: "974238637-9ofzZFEGQPChbYJfBZTXkMPxUzsWQVebm5dAdFO5",
    token_secret: "qAvTXiQBY4AvTQBLhPLOBm5HCqqIaspvshyn92MJ43SB6"
}

// request("https://www.google.com", function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         console.log(body);
//     }
// });

var sgSunsetUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Singapore%2C%20sg%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
request(sgSunsetUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var parsedBody = JSON.parse(body);
        console.log(body);
    }
});