var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
//Connect to the hosted database
module.exports.connect = function (url, callback) {
  console.log('  info -- db.js || #connect connecting to db...');
  mongoose.connect(url);

  mongoose.connection.on('open', callback);
}