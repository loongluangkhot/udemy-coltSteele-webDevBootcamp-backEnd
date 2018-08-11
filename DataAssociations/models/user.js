var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
   name: String,
   email: String,
   posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

var User = mongoose.model("User", userSchema);

module.exports = User;