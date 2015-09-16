var lift = require('../lib/lift.js'),
  category = require('../lib/category.js'),
  entry = require('../lib/entry.js');

module.exports = function route(router) {
  //Categories
  //POST
  router.post('/categories', function(req, res) {

    //TODO Validation Checking

    category.createNewCategory(req.body, function(err, cat) {
      if (err) {
        console.log(err);
        res.status(500).send('createNewCategory failed');
      } else {
        res.json(cat);
      }
    });
  });
  //GET
  router.get('/categories', function(req, res) {
    if (req.query.expand === 'lifts') {
      category.getAllCategoriesWithLifts(function(err, categories) {
        if (err) {
          console.log(err);
          res.status(500).send('getAllCategoriesWithLifts failed');
        } else {
          res.json(categories);
        }
      });
    } else {
      category.getAllCategories(function(err, categories) {
        if (err) {
          console.log(err);
          res.status(500).send('getAllCategories failed');
        } else {
          res.json(categories);
        }
      });
    }
  });

  //Lifts
  //POST
  router.post('/lifts', function(req, res) {
    lift.createNewLift(req.body, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send('createNewLift failed');
      } else {
        res.json(data);
      }
    });
  });
  //GET
  router.get('/lifts', function(req, res) {
    lift.getAllLifts(req.query, function(err, lifts) {
      if (err) {
        console.log(err);
        res.status(500).send('getAllLifts failed');
      } else {
        res.json(lifts);
      }
    });
  });
  router.get('/lifts/:id', function(req, res) {
    var handler = function(err, lift) {
      if (err) {
        console.log(err);
        res.status(500).send('getLift failed');
      } else if (!lift) {
        res.status(404).send('Id: ' + req.params.id + ' not found');
      } else {
        res.json(lift);
      }
    };

    if (req.query.expand === 'entries') {
      console.log('\nrequesting entries!!!');
      lift.getLiftWithEntries(req.params.id, handler)
    } else {
      lift.getLift(req.params.id, handler);
    }
  });


  // Entries
  //POST
  router.post('/entries', function(req, res) {

    //TODO Validation Checking

    entry.createNewEntry(req.body, function(err, entry) {
      if (err) {
        console.log(err);
        res.status(500).send('createNewEntry failed');
      } else {
        res.json(entry);
      }
    });
  });
  //GET
  router.get('/entries', function(req, res) {
    entry.getAllEntries({}, function(err, entries) {
      if (err) {
        console.log(err);
        res.status(500).send('getAllEntries failed');
      } else {
        res.json(entries);
      }
    });
  });
  //GET
  router.get('/entries/:id', function(req, res) {
    entry.getLift(req.params.id, function(err, lift) {
      if (err) {
        console.log(err);
        res.status(500).send('getLift failed');
      } else if (!lift) {
        res.status(404).send('Id: ' + req.params.id + ' not found');
      } else {
        res.json(lift);
      }
    });
  });

  //Friends
  //PUT
  router.put('/lifts/:id/:friend', function(req, res) {
    lift.addFriend(req.params.id, req.params.friend, function(err, update) {
      if (err) {
        console.log(err);
        res.status(500).send('addFriend failed');
      } else {
        res.json(update);
      }
    });
  });
  //DELETE
  router.delete('/lifts/:id/:friend', function(res, res) {
    lift.removeFriend(req.params.id, req.params.friend, function(err, update) {
      if (err) {
        console.log(err);
        res.status(500).send('removeFriend failed');
      } else {
        res.json(update);
      }
    });
  });
};