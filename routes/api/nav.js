var keystone = require('keystone');

exports.list = function (req, res) {
	// Render the view
	res.json(res.locals.navLinks)
};
