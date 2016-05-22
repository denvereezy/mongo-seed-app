var express = require('express');
var app = express();
var http = require('http').Server(app);
var exhbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer');

var url = 'mongodb://localhost:27017/denver';
var data = require('./routes/data');
app.use(cookieParser('shhhh, very secret'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


app.get('/add', function(req, res, next){
	res.render('index');
})
app.post('/add',multer({ dest: './public/uploads/'}).single('image'), data.add);
app.get('/',data.show);
app.get('/edit/:id',data.edit);
app.post('/update/:id',data.update);
app.get('/delete/:id',data.delete);

app.all('*',function(req, res){

	res.sendStatus(404);
})
http.listen(3000, function(server){
    console.log('listening on :::3000');
});
