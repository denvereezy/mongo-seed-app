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
        collection.find({}).toArray(function(err, result) {
            res.render('data', {
                result: result
            });
            db.close();

        });
    });
};

exports.edit = function(req, res, next) {
    var id = req.params.id;
    var ObjectId = require('mongodb').ObjectId;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        }
        var collection = db.collection('products');
        collection.find(ObjectId(id)).toArray(function(err, result) {
            res.render('edit', {
                result: result
            });
            db.close();

        });
    });
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    var ObjectId = require('mongodb').ObjectId;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        }
        var collection = db.collection('products');
        collection.update({
            _id: new ObjectId(id)
        }, {
            $set: {
                name: req.body.name,
                type: req.body.type,
                gender: req.body.gender,
                multi: true
            }
        }, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/data');
        });
        db.close();

    });
};

exports.delete = function(req,res,next) {
  var id = req.params.id;
  var ObjectId = require('mongodb').ObjectId;
  MongoClient.connect(url, function(err, db) {
      if (err) {
          console.log(err);
      }
      var collection = db.collection('products');
      collection.remove({
          _id: new ObjectId(id)
      }, {
          $set: {
              name: req.body.name,
              type: req.body.type,
              gender: req.body.gender,
              multi: true
          }
      }, function(err, result) {
          if (err) {
              console.log(err);
          }
          res.redirect('/data');
      });
      db.close();

  });
};
