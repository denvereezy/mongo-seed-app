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
        collection.find({}).toArray(function(err, result) {
            // console.log(JSON.stringify(result));
            res.render('data', {
                result: result
            });
            db.close();

        });
    });
};

exports.edit = function(req,res,next) {
  var id = req.params.id;
  var ObjectId = require('mongodb').ObjectId;
  // console.log(id);
  MongoClient.connect(url, function(err, db) {
      if (err) {
          console.log(err);
      }
      var collection = db.collection('products');
      collection.find(ObjectId(id)).toArray(function(err, result) {
          // console.log(JSON.stringify(result));
          // console.log(err);
          res.render('edit', {
              result: result
          });
          db.close();

      });
  });
};
// app.get('/employee/:id/edit', function(req, res) {
// 	employeeProvider.findById(req.param('_id'), function(error, employee) {
// 		res.render('employee_edit',
// 		{
// 			title: employee.title,
// 			employee: employee
// 		});
// 	});
// });

exports.update = function(req,res,next) {
  var id = req.params.id;
  var ObjectId = require('mongodb').ObjectId;
  // var newId = ObjectId.createFromHexString(id);
  // console.log(newId);
  // console.log(newId);
  MongoClient.connect(url, function(err, db) {
      if (err) {
          console.log(err);
      }
      var collection = db.collection('products');
      collection.update({_id: id}, {$set: {name: req.body.name, multi:true}}, function(err, result) {
        // console.log(err);
          console.log(JSON.stringify(result));
          res.redirect('/data');
      });
      // db.close();

  });
};
