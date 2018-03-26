var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/users';

  MongoClient.connect(url, function(err,db){
    if(err){
      console.log('Unable to connect to server', err);

    } else{
      console.log("Connection Etablished");

      var collection = db.collection('standard');

      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render('standardlist', {
            "standardlist" :result
          });
        } else{
          res.send('No documents found');
        }

        db.close();
      });
    }
  });
});

router.get('/newstandard', function(req, res){
  res.render('newstandard', {title: 'Add Standard'});
});

router.post('/addstandard', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/users';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("Unable to connect to server", err);
    } else {
      console.log('Connected to server');

      var collection = db.collection('standard');

      var standard1 = {Nom: req.body.Nom, Prenom:
        req.body.Prenom,
        Ville: req.body.Ville};
      collection.insert([standard1], function(err, result){
        if (err){
          console.log(err);
        } else {
          res.redirect("thelist");
        }
        db.close();
      });
    }
  });
});

module.exports = router;
