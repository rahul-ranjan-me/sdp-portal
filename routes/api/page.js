var keystone = require('keystone');
var Page = keystone.list('Page');

exports.page = function(req, res) {
  Page.model.findOne({state: 'published', slug: req.params.page}).exec((err, page) => {
    if (err) return res.json({ err: err });
    res.send(page)
  });
}
