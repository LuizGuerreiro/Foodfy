const express = require('express');
const nunjucks = require('nunjucks');

const recipes = require('./data');

const server = express();

server.use(express.static('public'));
server.use(express.static('assets'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    noCache: true
});

server.get('/', function(req, res) {
    return res.render('index', {recipes})
});

server.get('/about', function(req, res) {
    return res.render('about')
});

server.get('/recipes', function(req, res) {
    return res.render('recipes', {recipes})
});

server.get('/recipes/:id', function(req, res) {
    const id = req.params.id;
    const recipe = recipes[id];
    return res.render('recipe', {recipe})
})

server.listen(5000, function() {
    console.log('Server is running!')
});

server.use(function(req, res) {
    res.status(404).render("not-found");
});