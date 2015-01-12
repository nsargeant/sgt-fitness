var db = require('./db');

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
module.exports.createNewLift = function (blob, callback) {
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
module.exports.getAllLifts = function (query, callback) {
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

module.exports.getLift = function (id, callback) {
  Lift.findOne({
    _id: id
  }, callback)
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
module.exports.updateLift = function (id, updates, callback) {
  Lift.findOne({
    _id: id
  }, function (err, lift) {
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
module.exports.deleteLift = function (id, callback) {
  Lift.remove({
    _id: id
  }, callback);
}