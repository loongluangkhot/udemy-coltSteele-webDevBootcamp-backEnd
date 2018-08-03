const express = require("express")
const app = express()

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!")
})

app.get("/speak/:animal", function(req, res) {
    let animalSpeak = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    }
    let animal = req.params.animal.toLowerCase()
    res.send(`The ${animal} says '${animalSpeak[animal]}'`)
})

app.get("/repeat/:str/:times", function(req, res) {
    
    let str = req.params.str
    let times = parseInt(req.params.times)
    let concatStr = ""
    // using .join
    // let strArr = new Array(times)
    // strArr.fill(str,0)
    // res.send(strArr.join(" "))
    
    // using for loop
    for (let i = 0; i < times; i++) {
        concatStr = `${concatStr}${str} `
    }
    res.send(concatStr.trim())
})


app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?")
})

app.listen(process.env.PORT, process.env.IP, () => console.log("Server started...") )