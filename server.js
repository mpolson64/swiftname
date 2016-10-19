var fs = require('fs');
var express = require('express');
app = express();

var adjectives = fs.readFileSync('adjectives.txt').toString().split('\n');
var animals = fs.readFileSync('animals.txt').toString().split('\n');

function getName() {
    return adjectives[Math.floor(Math.random() * adjectives.length)] + " " + animals[Math.floor(Math.random() * animals.length)];
}

app.get('/', function(req, res) {
    res.send(getName());
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
});
