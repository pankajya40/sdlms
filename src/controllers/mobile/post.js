const { constants } = require('../../constants');

const postController = module.exports;

postController.getCreate = async function (req, res, next) {
	const createPost = {};
	let { pid } = req.query;

	createPost.title = "Create post";
	if (pid) {
		createPost.title = "Edit post"
		createPost.pid = pid;
	}

	res.render("mobile/post/create", createPost);
};

postController.getView = async function (req, res, next) {
	const posts = {};

	posts.title = "View Posts";
	posts.defaultProfileImagesRelativeBase = constants['defaultProfileImagesRelativeBase'];
	posts.defaultProfileImages = constants['defaultProfileImages'];

	res.render("mobile/post/view", posts);
};

postController.getSaved = async function (req, res, next) {
	res.render("mobile/post/saved", {
		title: "Saved post",
		message: "hello this is working",
	});
};

postController.getDraft = async function (req, res, next) {
	const drafts = {};

	drafts.title = "Draft posts";
	drafts.defaultProfileImagesRelativeBase = constants['defaultProfileImagesRelativeBase'];
	drafts.defaultProfileImages = constants['defaultProfileImages'];

	res.render("mobile/post/drafts", drafts);
};
