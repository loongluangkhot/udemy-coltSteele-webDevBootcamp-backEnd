var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/references_associations", { useNewUrlParser: true });

var Post = require("./models/post.js");
var User = require("./models/user.js");



// var newPost = new Post({
//     title: "Dunkirk",
//     content: "Best movie ever!"
// });

// User.create({
//     name: "Harry Style",
//     email: "harrystyle@1d.com"
// });

// Post.create({
//     title: "Dunkirk",
//     content: "Best movie ever!"
// });

// Post.create({
//     title: "Reasons why I left One Direction",
//     content: "Not sure why too."
// }, function(err, newPost) {
//     if(err) {
//         console.log(err);
//     } else {
//         User.findOne({name: "Harry Style"}, function(err, foundUser) {
//           if(err) {
//               console.log(err);
//           } else {
//               foundUser.posts.push(newPost);
//               foundUser.save(function(err, updatedUser) {
//                   if(err) {
//                       console.log(err);
//                   } else {
//                       console.log(updatedUser);
//                   }
//               });
//           }
//         });
//     }
// });

User.findOne({name: "Harry Style"}).populate("posts").exec(function(err, foundUser) {
    if(err) {
        console.log(err);
    } else {
        console.log(foundUser);
    }
})