var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/impact';
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 600000}, resave:true, saveUninitialized: false}));
app.use(express.static("public"))
app.use("/static", express.static("."));


app.get('/', function(req, res, next){
	res.render('index');
})


app.all('*',function(req, res){

	res.sendStatus(404);
})
http.listen(3000, function(server){
    console.log('listening on :::3000');
});
