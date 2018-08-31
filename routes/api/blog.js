var keystone = require('keystone');
var assert = require('assert');

/**
 * List Categories
 */
exports.categoryList = function(req, res) {
  keystone.list('PostCategory').model.find().sort('name').exec((err, postCategories) => {
    if (err) return res.json({ err: err });
    res.send(postCategories)
  });
}

/**
 * List Blog per Categories
 */
exports.blogList = function(req, res) {
  keystone.list('Post').model.where('categories').in([req.params.category]).exec((err, posts) => {
    if (err) return res.json({ err: err });
    res.send(posts)
  });
}

/**
 * List Blog per Categories
 */
exports.blogPost = function(req, res) {
  keystone.list('Post').model.find({state: 'published', _id:req.params.post}).exec((err, post) => {
    if (err) return res.json({ err: err });
    res.send(post[0])
  });
}

/**
 * search Blog
 */

exports.search = function(req, res) {
  var param = '.*'+req.query.search+'.*'
  
  keystone.list('Post').model.find({$or: [
      { 'title': { "$regex": param, "$options": "i" } },
      { 'content': { "$regex": param, "$options": "i" } },
      { 'content.brief': { "$regex": param, "$options": "i" } },
      { 'content.extended': { "$regex": param, "$options": "i" } }
    ]}).exec((err, posts) => {
    if (err) return res.json({ err: err });
    res.send(posts)
  });
}