const db = require('../../database');
const User = require('../../user');

const reflectionController = module.exports;
const collectionName = db.collections.MOBILE.REFLECTION;

reflectionController.getList = async function (req, res, next) {
    var Queries = {};

    if (req.query.parent) {
        Queries.parent = req.query.parent;
        Queries.ptype = req.query.ptype;
    }

    res.render("mobile/reflection/list", Queries);
};

reflectionController.getReview = async function (req, res, next) {
    res.render("mobile/reflection/review");
};

reflectionController.get = async function (req, res, next) {
    const Reflection = {};
    const { mode } = req.query;
    const pid = parseInt(req.params.pid);
    if (req.query.parent) {
        Reflection.parent = req.query.parent;
        Reflection.ptype = req.query.ptype;
    }

    Reflection.title = "View reflection";
    Reflection.pid = pid;
    Reflection.mode = mode;
    Reflection.reflection = await db.findField(collectionName, { pid: pid });
    if (Reflection.reflection) {
        Reflection.author = await User.getUserFields([Reflection.reflection.uid], ['fullname', 'picture', 'username']);
    }

    res.render("mobile/reflection/view", Reflection);
};

reflectionController.getForm = async function (req, res, next) {
    const tid = parseInt(req.params.tid);
    const Reflection = {};
    if (req.query.parent) {
        Reflection.parent = req.query.parent;
        Reflection.ptype = req.query.ptype;
    }

    Reflection.tid = tid;
    Reflection.relfectionTemplate = await db.findField(db.collections.MOBILE.REFLECTION_TEMPLATE, { tid: tid });
    if (Reflection.relfectionTemplate) {
        Reflection.author = await User.getUserFields([Reflection.relfectionTemplate.uid], ['fullname', 'picture', 'username']);
    }

    res.render("mobile/reflection/form", Reflection);
};