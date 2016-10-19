var express = require('express');
app = express();

app.get('/', function(req, res) {
    res.send('Test');
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
});
