const db = require('../../../database').client;
const axios = require('axios');
const winston = require('winston');
const nconf = require('nconf');
const handleCongif = require('./configHandler');

const dataCollector = nconf.get('collector');

module.exports = async function mongoEventHandler(config, events) {

	const filter = [handleCongif(config, events)];

	const stream = db.watch(filter, { fullDocument: 'updateLookup' });

	stream.on('change', sendToCollector);
}

async function sendToCollector({ operationType, fullDocument, ns }) {
	const payload = {
		event_type: 'mongo_update',
		source: 'sdlms',
		database: ns.db,
		collection: ns.coll,
		operation: operationType,
		data: fullDocument
	}

	addKey(payload);

	console.log(payload);

	// send this to data collection router
	try {

		const { data: { message }, status } = await axios.post(
			dataCollector.COLLECT,
			[payload],
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Authentication': dataCollector.TOKEN
				}
			}
		)

		if (status !== 201) {

			winston.warn(`\nData Collection Service\nStatus: ${status}\nResponse: ${message}`);

		}

	} catch (error) {

		if (error.code === 'ECONNREFUSED') winston.warn('Data Collection Service Down');

		else if (error.response.status === 401) winston.warn('Data Collection Service Unauthenticated');

		else if (error.response.status === 404) winston.warn('Data Collection Service Collector Not Found');

		else winston.warn(`\nData Collection Service\nError: ${error}\n`);

	}
}

function addKey(input) {
	input._key = [
		input.source,
		input.event_type,
		input.database,
		input.collection,
		input.operation
	]
}