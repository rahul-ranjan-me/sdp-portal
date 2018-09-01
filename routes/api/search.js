var keystone = require('keystone');
var assert = require('assert');

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

    var postsResult = posts.map( (elem) => {
      elem.type = "posts"
      return elem
    })

    keystone.list('Product').model.find({$or: [
      { 'title': { "$regex": param, "$options": "i" } },
      { 'content': { "$regex": param, "$options": "i" } },
      { 'content.brief': { "$regex": param, "$options": "i" } },
      { 'content.extended': { "$regex": param, "$options": "i" } }
    ]}).exec((err, products) => {
      if (err) return res.json({ err: err });
      var productResult = products.map( (elem) => {
        elem.type = "products"
        return elem
      })
      res.send({
        developerResult: postsResult,
        productResult: productResult
      })
    });
  });
}