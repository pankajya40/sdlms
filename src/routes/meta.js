'use strict';

const path = require('path');

module.exports = function (app, middleware, controllers) {
	app.get('/sitemap.xml', controllers.sitemap.render);
	app.get('/sitemap/pages.xml', controllers.sitemap.getPages);
	app.get('/sitemap/categories.xml', controllers.sitemap.getCategories);
	app.get(/\/sitemap\/topics\.(\d+)\.xml/, controllers.sitemap.getTopicPage);
	app.get('/robots.txt', controllers.robots);
	app.get('/manifest.webmanifest', controllers.manifest);
	app.get('/css/previews/:theme', controllers.admin.themes.get);
	app.get('/osd.xml', controllers.osd.handle);
	// app.get('/service-worker.js', function (req, res) {
	// 	res.status(200).type('application/javascript').sendFile(path.join(__dirname, '../../public/src/service-worker.js'));
	// });
	app.get('/service-worker.js', controllers.serviceWorker);
	app.get('/question-builder.html', controllers.questionBuilder);
};
