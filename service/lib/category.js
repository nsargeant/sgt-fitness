var db = require('./db'),
  async = require('async')
_ = require('lodash');

var lift = require('./lift.js');

var categorySchema = new db.Schema({
  timestamp: Date,
  name: String
});

var Category = db.mongoose.model('Category', categorySchema);

//Create

/**
 *	#createNewCategory
 *
 *	cred: a JSON object with name, and password key value pairs
 *	callback:
 *		- err: Error if one occurs
 *		- category: The newly saved category object
 */
module.exports.createNewCategory = function(blob, callback) {
  var category = new Category();
  category.timestamp = new Date();
  category.name = blob.name;

  category.save(callback);
}

//Read
/**
 *	#getAllCategories
 *
 *	callback:
 *		- err: Error if one occurs
 *		- categorys: An array of Category objects as saved in the db
 */
module.exports.getAllCategories = function(callback) {
  Category.find(callback).sort({
    name: 1
  });
};

module.exports.getAllCategoriesWithLifts = function(callback) {
  async.parallel([

    function(cb) {
      Category.find(cb).sort({
        name: 1
      });
    },
    function(cb) {
      lift.getAllLifts({}, cb);
    }
  ], function(err, results) {
    var categories = results[0];
    var lifts = results[1];
    var cats = [];
    
    categories.forEach(function(category) {
      var cat = {
        _id: category.id,
        __v: category.__v,
        name: category.name,
        timestamp: category.timestamp,
        lifts: []
      }

      lifts.forEach(function (lift) {
        if(cat._id === lift.category) {
          cat.lifts.push(lift);
        }
      });

      cats.push(cat);
    });

    callback(err, cats);
  });
};

/**
 *  #getOwnerCategories
 *
 *  callback:
 *    - err: Error if one occurs
 *    - categorys: An array of Category objects as saved in the db
 */
// module.exports.getOwnerCategories = function (id, callback) {
//   Category.find({
//     owner: id
//   }, callback);
// }

module.exports.getCategory = function(id, callback) {
  Category.findOne({
    _id: id
  }, callback)
}

// module.exports.getRecentCategories = function (id, limit, callback) {
//   var limit = limit || 10;
//   Category.find({
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
 *  #updateCategory
 *
 *  id: The id of the category you would like to update
 *  update: object of updates to be made
 *  callback:
 *    - err: Error if one occurs
 *    - categorys: An array of Category objects as saved in the db
 *
 */
module.exports.updateCategory = function(id, updates, callback) {
  Category.findOne({
    _id: id
  }, function(err, category) {
    if (err) {
      callback(err);
    } else if (!category) {
      callback(new Error('not found'));
    } else {
      for (var i in updates) {
        category[i] = updates[i];
      }
      category.save(callback);
    }
  })
}

//Delete
/**
 *	#deleteCategory
 *
 *	id: The id of the category you would like to delete
 *	updates: A JSON object of the key:values to update, (omitted key values are erased)
 *	callback:
 *		- err: Error if one occurs
 */
module.exports.deleteCategory = function(id, callback) {
  Category.remove({
    _id: id
  }, callback);
}