"use-strict";

const widget = module.exports;

widget.get = async function (req, res, next) {
    const widget = {};
    widget.title = 'Assets';

	res.render('mobile/widget/index', widget);
};
