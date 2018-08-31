var keystone = require('keystone');
var Gallery = keystone.list('Gallery');

exports.galleries = function (req, res) {
	Gallery.model.find(function(err, items) {

        if (err) return res.json({ err: err });

        res.json({
            gallery: items
        });

    });
};

/**
 * Gallery images per Gallery 
 */
exports.gallery = function(req, res) {
  Gallery.model.findById(req.params.gallery).exec((err, gallery) => {
    if (err) return res.json({ err: err });
    res.send(gallery)
  });
}
