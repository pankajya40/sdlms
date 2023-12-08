'use strict';

const communication = require('../../api/communication.api');
const db = require("../../database");
const {ObjectId} = require('mongodb');
const {channels} = require('./config');
const {sidebar} = require('./sidebar')
const utils = require('../utils');


const templateController = module.exports;
const collectionName = db.collections.COMMUNICATION.TEMPLATE;
const BASE = 'sdlms/communication';

templateController.get = async function (req, res) {
    const {id} = req.params;
    const {action} = req.query;
	const pageData = {};
	pageData.title = 'Templates';
    pageData.sidebar = utils.sidebar(sidebar, 'templates', {
        classes: 'active'
    });
    
    pageData.channels = channels.filter(el => el.value === 'email');
    
    if (action && action == 'create') {
        pageData.title = 'Template';
        
        return res.render(BASE + '/template', pageData);
    }

    if (id) {
        pageData.title = 'Template';

        if (id.length != 24) {
            throw new Error('Invalid Id supplied!');
        }

        let template = await db.findField(collectionName, {type: 'template', _id: ObjectId(id)});
        pageData.templateData = template;

        return res.render(BASE + '/template', pageData);
    }
	

	res.render(BASE + '/templates', pageData);
};
