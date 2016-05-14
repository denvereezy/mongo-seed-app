var express = require('express');
var app = express();
var http = require('http').Server(app);
var exhbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/denver';
var data = require('./routes/data');
app.use(cookieParser('shhhh, very secret'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res, next){
	res.render('index');
})
app.post('/add',data.add);


app.all('*',function(req, res){

	res.sendStatus(404);
})
http.listen(3000, function(server){
    console.log('listening on :::3000');
});
