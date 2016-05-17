const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/denver';
const ObjectId = require('mongodb').ObjectId;

exports.add = function(req, res, next) {
    MongoClient.connect(url)
        .then(function(db) {
            const collection = db.collection('products');
            collection.insert({
                    name: req.body.name,
                    type: req.body.type,
                    gender: req.body.gender
                })
                .then(function(result) {
                    db.close();
                    res.redirect('/');
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.show = function(req, res, next) {
    MongoClient.connect(url)
        .then(function(db) {
            const collection = db.collection('products');
            collection.find({}).toArray()
                .then(function(result) {
                    res.render('data', {
                        result: result
                    });
                    db.close();
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.edit = function(req, res, next) {
    var id = req.params.id;
    MongoClient.connect(url)
        .then(function(db) {
            const collection = db.collection('products');
            collection.find(ObjectId(id)).toArray()
                .then(function(result) {
                    res.render('edit', {
                        result: result
                    });
                    db.close();
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    MongoClient.connect(url)
        .then(function(db) {
            const collection = db.collection('products');
            collection.update({
                    _id: new ObjectId(id)
                }, {
                    $set: {
                        name: req.body.name,
                        type: req.body.type,
                        gender: req.body.gender,
                        multi: true
                    }
                })
                .then(function(result) {
                    res.redirect('/data');
                    db.close();
                })
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    MongoClient.connect(url)
        .then(function(db) {
            const collection = db.collection('products');
            collection.remove({
                    _id: new ObjectId(id)
                }, {
                    $set: {
                        name: req.body.name,
                        type: req.body.type,
                        gender: req.body.gender,
                        multi: true
                    }
                })
                .then(function(result) {
                    db.close();
                    res.redirect('/data');
                });

        })
        .catch(function(err) {
            next(err);
        });
};
