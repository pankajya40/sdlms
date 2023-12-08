"use strict";

const utils = require('../utils');
const { sidebar } = require('./sidebar');
var { sources, platforms } = require('./config');
var { getContent } = require('../../api/contentManager/content.api')


const data = module.exports;

data.post = async function (req, res, next) {
    var post = {};

    post.sidebar = utils.sidebar(sidebar, 'post', {
        classes: 'active'
    });

    post.sources = sources;
    post.platforms = platforms;

    post.title = 'Content Spotter';
    res.render('contentManager/post', post);
};

data.view = async function (req, res, next) {
    const { id } = req.params;
    let page = id;

    var perPage = 9;

    page = !isNaN(page) && page > 1 ? page - 1 : 0;
    let qs = req.url.split('?')[1] ? req.url.split('?')[1] : '';

    var view = {};
    view.title = 'View Content';
    view.sidebar = utils.sidebar(sidebar, 'view', {
        classes: 'active'
    });

    let data = await getContent(req, 'paginate')

    let total = data.total
    data = data.data

    if (id && isNaN(id)) {
        view.content = data
        return res.render('contentManager/view_single', view);
    }


    const pagination = {
        isPrev: page > 0,
        first: `/content/view?${qs}`,
        prev: `/content/view/${page}?${qs}`,
        current: page + 1,
        total: (Math.ceil(total / perPage) || 1),
        next: `/content/view/${page + 2}?${qs}`,
        last: `/content/view/${(Math.ceil(total / perPage) || 1)}?${qs}`,
        isNext: ((page + 2) <= Math.ceil(total / perPage)),
    };




    view.data = data;
    view.pagination = pagination;
    
    res.render('contentManager/view', view);
};