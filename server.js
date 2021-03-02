const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));
server.use(express.static('assets'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server
});

server.get('/', function(req, res) {
    return res.render('index.njk')
});

server.get('/about', function(req, res) {
    return res.render('about.njk')
});

server.get('/recipes', function(req, res) {
    return res.render('recipes.njk')
});

server.listen(5000, function() {
    console.log('Server is running!')
});