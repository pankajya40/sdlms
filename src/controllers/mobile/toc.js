const tocController = module.exports;

tocController.todo = async function (req, res, next) {
	res.render('mobile/toc/todo', {
		title: 'To Do',
	});
};