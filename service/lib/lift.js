var db = require('./db'),
  entry = require('./entry.js'),
  async = require('async');

var liftSchema = new db.Schema({
  timestamp: Date,
  name: String,
  category: String
});

var Lift = db.mongoose.model('Lift', liftSchema);

//Create

/**
 *	#createNewLift
 *
 *	cred: a JSON object with name, and password key value pairs
 *	callback:
 *		- err: Error if one occurs
 *		- lift: The newly saved lift object
 */
module.exports.createNewLift = function(blob, callback) {
  var lift = new Lift();
  lift.timestamp = new Date();
  lift.name = blob.name;
  lift.category = blob.category;

  lift.save(callback);
}

//Read
/**
 *	#getAllLifts
 *
 *	callback:
 *		- err: Error if one occurs
 *		- lifts: An array of Lift objects as saved in the db
 */
module.exports.getAllLifts = function(query, callback) {
  Lift.find(query, callback);
}

/**
 *  #getOwnerLifts
 *
 *  callback:
 *    - err: Error if one occurs
 *    - lifts: An array of Lift objects as saved in the db
 */
// module.exports.getOwnerLifts = function (id, callback) {
//   Lift.find({
//     owner: id
//   }, callback);
// }

module.exports.getLift = function(id, callback) {
  Lift.findOne({
    _id: id
  }, callback)
}

module.exports.getLiftWithEntries = function(id, callback) {
  async.parallel([

    function(cb) {
      Lift.findOne({
        _id: id
      }, cb)
    },
    function(cb) {
      entry.getAllEntries({
        lift: id
      }, cb);
    }
  ], function(err, results) {
    var lift = results[0];
    var entries = results[1];

    var result = {
      _id: lift._id,
      __v: lift.__v,
      timestamp: lift.timestamp,
      name: lift.name,
      category: lift.category,
      entries: entries.sort(function compare(a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.data > b.date) {
          return 1;
        }
        return 0;
      })
    }

    callback(err, result);
  });
}


// module.exports.getRecentLifts = function (id, limit, callback) {
//   var limit = limit || 10;
//   Lift.find({
//     owner: id
//   }, {}, {
//     sort: {
//       'timestamp': -1
//     },
//     limit: limit
//   }, callback);
// }

//Update
/**
 *  #updateLift
 *
 *  id: The id of the lift you would like to update
 *  update: object of updates to be made
 *  callback:
 *    - err: Error if one occurs
 *    - lifts: An array of Lift objects as saved in the db
 *
 */
module.exports.updateLift = function(id, updates, callback) {
  Lift.findOne({
    _id: id
  }, function(err, lift) {
    if (err) {
      callback(err);
    } else if (!lift) {
      callback(new Error('not found'));
    } else {
      for (var i in updates) {
        lift[i] = updates[i];
      }
      lift.save(callback);
    }
  })
}

//Delete
/**
 *	#deleteLift
 *
 *	id: The id of the lift you would like to delete
 *	updates: A JSON object of the key:values to update, (omitted key values are erased)
 *	callback:
 *		- err: Error if one occurs
 */
module.exports.deleteLift = function(id, callback) {
  Lift.remove({
    _id: id
  }, callback);
}