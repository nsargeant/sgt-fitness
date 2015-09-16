var db = require('./db');

var entrySchema = new db.Schema({
  timestamp: Date,
  date: Date,
  lift: String,
  sets: Array
});

var Entry = db.mongoose.model('Entry', entrySchema);

//Create

/**
 *	#createNewEntry
 *
 *	cred: a JSON object with name, and password key value pairs
 *	callback:
 *		- err: Error if one occurs
 *		- entry: The newly saved entry object
 */
module.exports.createNewEntry = function (blob, callback) {
  var entry = new Entry();
  entry.timestamp = new Date();
  entry.date = blob.date;
  entry.lift = blob.lift;
  entry.sets = blob.sets;

  entry.save(callback);
}

//Read
/**
 *	#getAllEntries
 *
 *	callback:
 *		- err: Error if one occurs
 *		- entrys: An array of Entry objects as saved in the db
 */
module.exports.getAllEntries = function (query, callback) {
  Entry.find(query, callback);
}

/**
 *  #getOwnerEntries
 *
 *  callback:
 *    - err: Error if one occurs
 *    - entrys: An array of Entry objects as saved in the db
 */
// module.exports.getOwnerEntries = function (id, callback) {
//   Entry.find({
//     owner: id
//   }, callback);
// }

module.exports.getEntry = function (id, callback) {
  Entry.findOne({
    _id: id
  }, callback)
}

// module.exports.getRecentEntries = function (id, limit, callback) {
//   var limit = limit || 10;
//   Entry.find({
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
 *  #updateEntry
 *
 *  id: The id of the entry you would like to update
 *  update: object of updates to be made
 *  callback:
 *    - err: Error if one occurs
 *    - entrys: An array of Entry objects as saved in the db
 *
 */
module.exports.updateEntry = function (id, updates, callback) {
  Entry.findOne({
    _id: id
  }, function (err, entry) {
    if (err) {
      callback(err);
    } else if (!entry) {
      callback(new Error('not found'));
    } else {
      for (var i in updates) {
        entry[i] = updates[i];
      }
      entry.save(callback);
    }
  })
}

//Delete
/**
 *	#deleteEntry
 *
 *	id: The id of the entry you would like to delete
 *	updates: A JSON object of the key:values to update, (omitted key values are erased)
 *	callback:
 *		- err: Error if one occurs
 */
module.exports.deleteEntry = function (id, callback) {
  Entry.remove({
    _id: id
  }, callback);
}