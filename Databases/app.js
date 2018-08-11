var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mongo',{ useNewUrlParser: true }, function() {
    console.log("MongoDB connected...");
});

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
  name: "George",
  age: 5,
  temperament: "Playful"
});

george.save(function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log("Cat added to DB:");
        console.log(cat);
    }
});

var liz = new Cat({
   name: "Liz",
   age: 10,
   temperament: "Lazy"
});

liz.save(function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log("Cat added to DB:");
        console.log(cat);
    }
});

// can use the Cat.create() method to declare and save in one step

Cat.create({
  name: "George",
  age: 5,
  temperament: "Playful"
},function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log("Cat added to DB:");
        console.log(cat);
    }
});

Cat.find({}, function(err, cats) {
    if (err) {
        console.log(err);
    } else {
        console.log("All cats are retrieved:");
        console.log(cats);
    }
});