
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(express.static('public'));
app.set('view engine', 'handlebars');

/*
app.get("/", function (req, res) {
    console.log(req.query.term);
    var queryString = req.query.term;
    // encode the query string to remove white spaces and restricted characters
    var term = encodeURIComponent(queryString);
    // put the search term into the giphy api search url
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

    http.get(url, function (response) {
        // set encoding of response to UTF8
        response.setEncoding('utf8');

        var body = '';

        response.on('data', function (d) {
            // constantly update stream with data from giphy
            body += d;
        });

        response.on('end', function () {
            // when data is fully received pass into json
            var parsed = JSON.parse(body);
            // render the gif template and pass the data into the template
            res.render('home', {gifs: parsed.data});
        });
    });
});
*/

app.get("/", function (req, res) {
    if (req.query.term != null) {
        giphy.search(req.query.term, function (err, response) {
            if (err) {return console.log(err)}
            res.render('home', {gifs: response.data});
        });
    } else {
        giphy.trending(function (err, response) {
            if (err) {return console.log(err)}
            res.render('home', {gifs: response.data});
        });
    }
});

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
    res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

app.listen(3000, function () {
    console.log('Gif Search listening on port localhost:3000!');
});
