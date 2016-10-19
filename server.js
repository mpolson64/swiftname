var fs = require('fs');
var express = require('express');
var pug = require('pug');
app = express();

var adjectives = fs.readFileSync('adjectives.txt').toString().split('\n');
var animals = fs.readFileSync('animals.txt').toString().split('\n');

function generateBatch(size) {
    var ids = new Array(size);
    var adjectiveIndecies = new Array(size);
    var animalIndecies = new Array(size);

    for(i = 0; i < size; i++) {
        var potential = Math.floor(Math.random() * adjectives.length);

        if(i == 0) {
            adjectiveIndecies[i] = potential;
        }

        for(j = 0; j < i; j++) {
            if(potential == adjectiveIndecies[j]) {
                i--;
                break;
            }
            if(j == i - 1) {
                adjectiveIndecies[i] = potential;
            }
        }
    }
    for(i = 0; i < size; i++) {
        var potential = Math.floor(Math.random() * animals.length);

        if(i == 0) {
            animalIndecies[i] = potential;
        }

        for(j = 0; j < i; j++) {
            if(potential == animalIndecies[j]) {
                i--;
                break;
            }
            if(j == i - 1) {
                animalIndecies[i] = potential;
            }
        }
    }

    for(i = 0; i < size; i++) {
        ids[i] = adjectives[adjectiveIndecies[i]].replace(/(\r)/gm, "") + " " + animals[animalIndecies[i]].replace(/(\r)/gm, "");
    }

    return ids;
}

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', {
        idList: generateBatch(1)[0]
    });
});

app.get('/:size', function(req, res) {
    batch = generateBatch(req.params.size);

    out = "";
    for(i = 0; i < req.params.size; i++) {
        out += batch[i] + "<br />";
    }

    res.render('index', {
        idList: out
    });

});

app.get('/minimal', function(req, res) {
    res.send(generateBatch(1)[0]);
});

app.get('/minimal/:size', function(req, res) {
    batch = generateBatch(req.params.size);

    out = "";
    for(i = 0; i < req.params.size; i++) {
        out += batch[i] + "<br />";
    }

    res.send(out);
});

app.get('/api/generateBatch', function(req, res) {
    var batch = {
        ids: generateBatch(req.query.size)
    };

    res.json(batch);
});

var server = app.listen(process.env.PORT || 8080, function() {
    var host = server.address().address;
    var port = server.address().port;
});
