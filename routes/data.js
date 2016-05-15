var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/denver';

exports.add = function(req, res, next) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err, "\n");
        }

        var collection = db.collection('products');
        collection.insert({
            name: req.body.name,
            type: req.body.type,
            gender: req.body.gender
        }, function(err, result) {
            if (err) {
                console.log(err);
            };
            // collection.find({}).toArray(function(err, result) {
            // 	console.log(JSON.stringify(result));
            // });

            db.close();

            res.redirect('/')
        });
    });
};

exports.show = function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        }
        var collection = db.collection('products');
        collection.find({id}).toArray(function(err, result) {
            // console.log(JSON.stringify(result));
            res.render('data', {
                result: result
            });
        });
    });
};

exports.edit = function(req,res,next) {
  var id = req.params.id;
  console.log(id);
  MongoClient.connect(url, function(err, db) {
      if (err) {
          console.log(err);
      }
      var collection = db.collection('products');
      collection.find({}).toArray(function(err, result) {
          // console.log(JSON.stringify(result));
          res.render('edit', {
              result: result
          });
      });
  });
};
