var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	brief: { type: Types.Html, wysiwyg: true, height: 150 },
	extended: { type: Types.Html, wysiwyg: true, height: 350 }
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.register();
