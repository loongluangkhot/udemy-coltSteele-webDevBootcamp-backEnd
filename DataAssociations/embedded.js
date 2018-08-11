var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embedded_associations", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
   name: String,
   email: String,
//   posts: {type: [postSchema], default: []},
   posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     name: "Charlie Lim",
//     email: "charlie@ntu.edu"
// })

// var newPost = new Post({
//     title: "SG is very hot lately.",
//     content: "I just keep sweating!"
// })

// newUser.posts.push(newPost);

// newUser.save(function(err, user) {
//   if(err) {
//       console.log(err);
//   } else {
//       console.log("User created and saved.")
//       console.log(user);
//   }
// });

// User.findOne({name: "Charlie Lim"}, function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         user.posts.push(newPost);
//         user.save(function(err, user) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log("Post added, and user saved.")
//                 console.log(user);
//             }
//         })
//     }
// })

User.create({
    name: "Harry Style",
    email: "harrystyle@1d.com"
}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "Dunkirk",
            content: "Best movie ever!"
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});