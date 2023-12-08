'use strict'

const db = require('../../database');
const nconf = require('nconf');

const data = module.exports;

const datasetsCollection = 'schema_registry';

data.get = async function(req, res) {
	const uid = parseInt(req.uid);
	const { allowedUsers } = nconf.get('dataportal');
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page, please contact the administrator.');
    }

	const datasets = await db.client.collection(datasetsCollection).find().project({
		_id: 1,
		name: 1,
	}).toArray()

	res.render('dataportal/main', { datasets });
}