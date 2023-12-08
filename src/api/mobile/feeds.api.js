const db = require("../../database");
const meta = require('../../meta');
const utilities = require('../../controllers/utils');
const User = require("../../user");

const feedsAPI = module.exports;

const collectionName = db.collections.DEFAULT;
const REFLECTIONS = db.collections.MOBILE.DISCUSSION_ROOM;

feedsAPI.getFeeds = async (req, res) => {
	const uid = parseInt(req.uid);

    let {category, subCategory, limit=8, page=0} = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const keys = {
        type: 'thread:reaction'
    }

    if (category) {
        keys.category = category.trim();
    }
    if (subCategory) {
        keys['$or'] = [{subCategory}, {subCategory: subCategory.toLowerCase()}];
    }

    const [threadsWithReaction=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(REFLECTIONS, keys, limit, page),
		db.countDocuments(REFLECTIONS, keys),
	]);

    var feedsData = await Promise.all(threadsWithReaction.map(async (elem) => {
        let [thread, reflectionAuthor] = await Promise.all([
            db.findField(collectionName, {_key: `message:${elem.messageId}`}),
            User.getUserFields(elem.uid, ['username', 'fullname', 'picture']),
        ]);
        let threadAuthor = await User.getUserFields(thread.fromuid, ['username', 'fullname']);
        return {thread: {...thread, author: threadAuthor}, reflection: {...elem, author: reflectionAuthor}};
    }));

    return utilities.paginate(`/app${req.url}`, feedsData, count, limit, page);

}