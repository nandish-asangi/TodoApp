var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var config = require("config");

var db = require("./src/db");
db.connect(() => { });

var tweetController = require("./src/controllers/tweetController");

var app = express()
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.post("/tweets", tweetController.addTweet);
app.get("/tweet/:uid", tweetController.getTweet);
app.get("/tweets/:pageNumber", tweetController.getTweets);
app.put("/tweets", tweetController.updateTweet);
app.delete("/tweets", tweetController.deleteTweet);

app.use(function (err, req, res, next) {
    const errorStr = JSON.stringify({ message: err.message, stack: err.stack });
    console.log(errorStr);
    res.status(500);
    return res.end(errorStr);
});

const defaultPort = 9001;
app.server.listen((process.env.PORT_NO || defaultPort), () => {
    console.log(`Started on port ` + (process.env.PORT_NO || defaultPort));
});

module.exports = app;