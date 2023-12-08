const db = require('../../database');
const User = require('../../user');

const collectionName = db.collections.MOBILE.THOUGHT_PROCCESS;
const thoughtProcessController = module.exports;

thoughtProcessController.getList = async function (req, res, next) {
    var Queries = {};

    if (req.query.ptype) {
        Queries.ptype = req.query.ptype;
    }
    if (req.query.parent) {
        Queries.parent = req.query.parent;
    }

    res.render("mobile/thoughtProcess/list", Queries);
};

thoughtProcessController.getForm = async function (req, res, next) {
    const tid = parseInt(req.params.tid);
    const thoughtProcess = {};
    if (req.query.ptype) {
        thoughtProcess.ptype = req.query.ptype;
    }
    if (req.query.parent) {
        thoughtProcess.parent = req.query.parent;
    }

    thoughtProcess.tid = tid;
    thoughtProcess.relfectionTemplate = await db.findField(collectionName, { tid: tid });
    if (thoughtProcess.relfectionTemplate) {
        thoughtProcess.author = await User.getUserFields([thoughtProcess.relfectionTemplate.uid], ['fullname', 'picture', 'username']);
    }

    res.render("mobile/thoughtProcess/form", thoughtProcess);
};

thoughtProcessController.getCreate = async function (req, res, next) {
    res.render("mobile/tpTemplate/create", {
        title: "create thoughtProcess template",
        message: "hello this is working",
    });
};