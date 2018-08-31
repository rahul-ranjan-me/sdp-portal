var keystone = require('keystone');
var assert = require('assert');


/**
 * Send all products
 */
exports.products = function(req, res) {
  keystone.list('Product').model.find({state: 'published'}).exec((err, product) => {
    if (err) return res.json({ err: err });
    res.send(product)
  });
}

/**
 * Send request product
 */
exports.product = function(req, res) {
  keystone.list('Product').model.find({state: 'published', _id:req.params.product}).exec((err, product) => {
    if (err) return res.json({ err: err });
    res.send(product[0])
  });
}

/**
 * search Product
 */

exports.search = function(req, res) {
  var param = '.*'+req.query.search+'.*'
  
  keystone.list('Product').model.find({$or: [
      { 'title': { "$regex": param, "$options": "i" } },
      { 'content': { "$regex": param, "$options": "i" } },
      { 'content.brief': { "$regex": param, "$options": "i" } },
      { 'content.extended': { "$regex": param, "$options": "i" } }
    ]}).exec((err, products) => {
    if (err) return res.json({ err: err });
    res.send(products)
  });
}

/**
 * Product Categories
 */
exports.productsCategoryList = function(req, res) {
  keystone.list('ProductCategory').model.find().sort('name').exec((err, productCategories) => {
    if (err) return res.json({ err: err });
    res.send(productCategories)
  });
}

/**
 * List Product per Categories
 */
exports.productsByCategory = function(req, res) {
    console.log(req.params.category)
  keystone.list('Product').model.where('categories').in([req.params.category]).exec((err, products) => {
    if (err) return res.json({ err: err });
    res.send(products)
  });
}