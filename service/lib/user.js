var db = require('./db');

var userSchema = new db.Schema({
  displayName: String,
  gender: String,
  id: String,
  image: Object,
  language: String,
  name: Object,
  friends: Array,
  timestamp: Date
});

var User = db.mongoose.model('User', userSchema);

//Create

/**
 *	#createNewUser
 *
 *	cred: a JSON object with name, and password key value pairs
 *	callback:
 *		- err: Error if one occurs
 *		- user: The newly saved user object
 */
module.exports.createNewUser = function(blob, callback) {
  var user = new User();
  user.displayName = blob.displayName;
  user.gender = blob.gender;
  user.id = blob.id;
  user.image = blob.image;
  user.language = blob.language;
  user.name = blob.name;
  user.friends = [];
  user.timestamp = new Date();

  console.log('Saving new user:', user);
  user.save(callback);
}

//Read
/**
 *	#getAllUsers
 *
 *	callback:
 *		- err: Error if one occurs
 *		- users: An array of User objects as saved in the db
 */
module.exports.getAllUsers = function(callback) {
  console.log('  debug -- user.js # getAllUsers: finding all users');
  User.find(callback);
}

/**
 *	#getUser
 *
 *	id: The id of the user you would like to get
 *	callback:
 *		- err: Error if one occurs
 *		- user: An array of User objects as saved in the db
 */
module.exports.getUser = function(id, callback) {
  User.findOne({
    id: id
  }, callback)
}

//Update
module.exports.addFriend = function(id, frId, callback) {
  User.findOne({
    id: id
  }, function(err, u) {
    if (err) {
      callback(err);
    } else if (!u) {
      callback(new Error('not found'))
    } else {
      u.friends.push(frId);
      u.save(callback);
    }
  });
}

//Delete
/**
 *	#deleteUser
 *
 *	id: The id of the user you would like to delete
 *	updates: A JSON object of the key:values to update, (omitted key values are erased)
 *	callback:
 *		- err: Error if one occurs
 */
module.exports.deleteUser = function(id, callback) {
  User.remove({
    _id: id
  }, callback);
}

module.exports.removeFriend = function(id, frId, callback) {
  User.findOne({
    id: id
  }, function(err, u) {
    if (err) {
      callback(err);
    } else if (!u) {
      callback(new Error('not found'))
    } else {
      var i = u.friends.indexOf(frId);
      if (i < 0) {
        callback(new Error('not found'));
      } else {
        u.friends.splice(i, 1);
        u.save(callback);
      }
    }
  });
}