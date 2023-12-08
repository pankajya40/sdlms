const articleController = module.exports;

articleController.getCreate = async function (req, res, next) {
	const createArticle = {};
	let { pid } = req.query;

	createArticle.title = "Create post";

	if (pid) {
		createArticle.title = "Edit post"
		createArticle.pid = pid;
	}

	res.render("mobile/article/create", createArticle);
};

articleController.getView = async function (req, res, next) {
	res.render("mobile/article/view", {
		title: "View Article",
		message: "hello this is working",
	});
};
