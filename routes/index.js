var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	app.get('/', routes.views.index);

	// api
	app.all('/api*', keystone.middleware.cors);
	app.get('/api/nav', routes.api.nav.list);
	app.get('/api/page/:page', routes.api.page.page);
	app.get('/api/gallery', routes.api.gallery.galleries);
	app.get('/api/gallery/:gallery', routes.api.gallery.gallery);
	
	app.get('/api/blog', routes.api.blog.categoryList);
	app.get('/api/blog/:category', routes.api.blog.blogList);
	app.get('/api/blog/post/:post', routes.api.blog.blogPost);

	app.get('/api/products/', routes.api.product.products);
	app.get('/api/products/:product', routes.api.product.product);
	app.get('/api/productsSearch', routes.api.product.search);
	app.get('/api/productsCategory', routes.api.product.productsCategoryList);
	app.get('/api/productsCategory/:category', routes.api.product.productsByCategory);

	app.all('/api/contact', routes.api.contact.create);
	

	app.get('/api/search', routes.api.search.search);
	app.get('/api/people', routes.api.people.list);

	// Views	
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/pages/:page', routes.views.page);
};
