'user strict'

const db = require('../database');
const { ObjectId } = require('mongodb');
const { AsyncParser } = require('json2csv');
const { accepts: validFilter } = require('mongodb-language-model');
const nconf = require('nconf');

const data = module.exports;

const datasetCollection = 'schema_registry';

/**
 * @function authorizeDataAnalysts
 * @summary check if a user is a data analyst, if not throw error
 * @note now it relies hardcoded values in config.json
 *
 * @param { Number } uid
 * @returns void
 */
function authorizeDataAnalysts(uid) {
	const { allowedUsers } = nconf.get('dataportal');
	if (!allowedUsers.includes(uid)) {
		throw new Error('Unauthorized! You are not allowed to view this page, please contact the administrator.');
	}
}

/**
 * @function authorizeDevelopers
 * @summary check if a user is a developer, if not throw error
 * @note now it relies hardcoded values in config.json
 *
 * @param { Number } uid
 * @returns void
 */
function authorizeDevelopers(uid) {
	const { allowedManagers } = nconf.get('dataportal');
	if (!allowedManagers.includes(uid)) {
		throw new Error('Unauthorized! You are not allowed to view this page, please contact the administrator.');
	}
}

/**
 * @function generateGroupStages
 * @description parses the group config and returns a mongo aggregation pipeline
 * 		groupBy is the field in the data to group by
 * 		and fields is an object where each property key is the field name
 * 		and value is the operation to do on the field
 *
 * @param { { groupBy: string, fields: { [key: string]: string } } } groupConfig
 * @example
 * {
 * 		groupBy: 'uid',
 * 		fields: {
 * 			username: 'first',
 * 			score: 'sum',
 * 			answer: 'count'
 * 		}
 * }
 * @returns { [MongoAggregationGroupStage, MongoAggregationProjectStage] }
 */
function generateGroupStages(groupConfig) {
	const groupStage = { $group: {} };
	const projectStage = { $project: {} };
	const group = groupStage.$group
	const project = projectStage.$project;

	const { groupBy, fields } = groupConfig;

	group._id = `$${groupBy}`;
	project['_id'] = 0;
	project[groupBy] = '$_id';

	for (let [key, value] of Object.entries(fields)) {
		switch (value) {
			case 'count':
				group[key] = { $count: {} };
				project[key] = `$${key}`
				break;
			case 'count distinct':
				group[key] = { $addToSet: `$${key}` };
				project[key] = { $size: `$${key}` }
				break;
			case 'first':
				group[key] = { $first: `$${key}` };
				project[key] = `$${key}`
				break;
			case 'sum':
				group[key] = { $sum: `$${key}` };
				project[key] = `$${key}`
				break;
			case 'minimum':
				group[key] = { $min: `$${key}` };
				project[key] = `$${key}`
				break;
			case 'maximum':
				group[key] = { $max: `$${key}` };
				project[key] = `$${key}`
				break;
			case 'average':
				group[key] = { $avg: `$${key}` };
				project[key] = `$${key}`
				break;
			default:
				throw Error('Invalid group accumulation operator');
		}
	}

	return [groupStage, projectStage];
}

/**
 * @function validSelect
 * @summary validate is 'select' provided in request body
 *
 * @param {{ [fieldName: string]: 1 | 0* }} select *0 if fieldName is _id
 * @param { { [fieldName: string]: 'String' | 'Number' | 'Boolean' | 'ObjectId' | 'UnixTimestamp' }} schema
 * @returns
 */
function validSelect(select, schema) {

	if (typeof select !== 'object' || Array.isArray(select)) throw Error('Invalid select');

	if (Object.keys(select).length < 1) throw Error('Invalid select: no field selected');

	for (let [fieldName, include] of Object.entries(select)) {
		if (!(fieldName === '_id' && include === 0) && !schema[fieldName]) throw Error('Invalid select: field ' + fieldName + ' is not present in schema');
		if (!(fieldName === '_id' && include === 0) && include !== 1) throw Error('Invalid select: no negation selection allowed except for _id');
	}

	return true;

}

/**
 * @function validGroup
 * @summary validate is 'group' provided in request body
 *
 * @param { { groupBy: string, fields: { [key: string]: string } } } group
 * @param { { [fieldName: string]: 'String' | 'Number' | 'Boolean' | 'ObjectId' | 'UnixTimestamp' }} schema
 * @returns
 */
function validGroup(group, schema) {

	if (typeof group !== 'object' || Array.isArray(group)) throw Error('Invalid group');

	const { groupBy, fields } = group;
	if (!groupBy) throw Error('Invalid group: groupBy not specified');
	if (typeof groupBy !== 'string') throw Error('Invalid group: invalid groupBy');
	if (!fields) throw Error('Invalid group: fields not specified');
	if (typeof fields !== 'object' || Array.isArray(fields)) throw Error('Invalid group: invalid fields');


	if (!schema[groupBy]) throw Error('Invalid group: groupBy field ' + groupBy + ' is not present in schema');

	if (fields[groupBy] || fields['_id']) throw Error('Invalid group: _id and groupBy is not allowed in filters')

	for (let [fieldName, operation] of Object.entries(fields)) {

		if (!schema[fieldName]) throw Error('Invalid group: field ' + fieldName + ' is not present in schema');

		switch (schema[fieldName]) {
			case 'Boolean':
				if (!['count distinct', 'count', 'first'].includes(operation)) throw Error('Invalid group: invalid operation specified for ' + fieldName);
				break;
			case 'String':
				if (!['count distinct', 'count', 'first'].includes(operation)) throw Error('Invalid group: invalid operation specified for ' + fieldName);
				break;
			case 'Number':
				if (!['count distinct', 'count', 'first', 'minimum', 'maximum', 'sum', 'average'].includes(operation)) throw Error('Invalid group: invalid operation specified for ' + fieldName);
				break;
			case 'ObjectId':
				if (!['count distinct', 'count', 'first'].includes(operation)) throw Error('Invalid group: invalid operation specified for ' + fieldName);
				break;
			case 'UnixTimestamp':
				if (!['count distinct', 'count', 'first', 'minimum', 'maximum'].includes(operation)) throw Error('Invalid group: invalid operation specified for ' + fieldName);
				break;
			default:
				throw Error('Invalid group: someting wrong with the schema');
		}
	}

	return true;

}

/**
 * @function validObjectId
 * @summary convert a string to a objectId if the string is valid, else throw error
 *
 * @param {String} datasetid
 * @returns
 */
function validObjectId(datasetid) {
	try {
		datasetid = ObjectId(datasetid);
		return datasetid;
	} catch (error) {
		if (error.message === "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters") throw Error('Invalid dataset id');
		else throw Error('Invalid schema id: ' + error.message);
	}
}

/**
 * @function getDataFromDB
 * @summary validate request body, get proper schema and get data from database
 *
 * @param {Express.Request} req
 * @returns {*[]}
 */
async function getDataFromDB(req) {

	const { filter, select, group } = req.body;

	let { datasetid } = req.body;

	if (!datasetid || !filter) throw Error('Dataset Id, filter or select not provided');
	if (typeof datasetid !== 'string') throw Error('Invalid dataset id');
	if (select && group) throw Error('Only one of either select or group can exist');
	if (!select && !group) throw Error('Either one of select or group has to exist');

	if (typeof filter !== 'object' || Array.isArray(filter) || !(Object.keys(filter).length < 1 || validFilter(JSON.stringify(filter)))) throw Error('Invalid filter');

	datasetid = validObjectId(datasetid);

	const data = await db.client.collection(datasetCollection).findOne({ _id: datasetid });

	if (!data) throw Error('Dataset not found');

	const { data: { collection, cleanup }, schema } = data;

	let resultStages;

	if (group && validGroup(group, schema)) resultStages = generateGroupStages(group);
	else if (select && validSelect(select, schema)) resultStages = [{ $project: select }];

	try {
		const response = await db.client.collection(collection).aggregate([...JSON.parse(cleanup), { $match: filter }, ...resultStages]).toArray();
		return await response;
	} catch (error) {
		console.log(error);
		throw Error('Something went wrong while getting the data');
	}
}

/**
 * @function formatRequestBodyToSchema
 * @summary validate request body and retrun a fromatted payload
 *
 * @param {Express.Request.Body} body
 * @returns { {
 * 		name: string,
 * 		description: string,
 * 		data: {
 * 			collection: string,
 * 			cleanup: MongoAggregationPipeline
 * 		},
 * 		schema: { [fieldName: string]: 'String' | 'Number' | 'Boolean' | 'ObjectId' | 'UnixTimestamp' }
 * 	}}
 */
async function formatRequestBodyToDataset(body) {
	const { name, description, data, schema } = body;
	if (typeof name !== 'string') throw Error('Invalid dataset name');
	if (typeof description !== 'string') throw Error('Invalid dataset description');
	if (typeof data !== 'object' || Array.isArray(data)) throw Error('Invalid dataset data');

	if (typeof data.collection !== 'string' ||
		!await db.client.listCollections({ name: data.collection }).toArray().then(colls => colls[0])
	) throw Error('Invalid dataset collection');

	if (!Array.isArray(data.cleanup)) throw Error('Invalid dataset cleanup (aggregation pipeline)');

	try {
		const response = await db.client.collection(data.collection).aggregate(data.cleanup).toArray();
		if (response.length < 1) throw Error('Invalid dataset cleanup: no result');
	} catch (error) { throw Error('Invalid dataset cleanup: ' + error.message) }

	if (typeof schema !== 'object' || Array.isArray(schema)) throw Error('Invalid dataset schema structure');

	for (let [fieldName, type] of Object.entries(schema)) {
		if (!['String', 'Number', 'Boolean', 'ObjectId', 'UnixTimestamp'].includes(type)) throw Error('Invalid dataset schema structure: invalid type for ' + fieldName);
	}

	data.cleanup = JSON.stringify(data.cleanup);

	return { name, description, data, schema }
}


/**
 * @summary API handlers to get dataset details and data
 * @note schema refers to dataset
 * @param {Express.Request} req
 * @returns
 */

data.getDatasetList = async function (req) {
	authorizeDataAnalysts(parseInt(req.uid));
	const datasets = await db.client.collection(datasetCollection).find().project({
		_id: 1,
		name: 1,
	}).toArray()

	return datasets;
}

data.getDatasetDetails = async function (req) {
	authorizeDataAnalysts(parseInt(req.uid));
	let { datasetid } = req.params;

	datasetid = validObjectId(datasetid);

	const dataset = await db.client.collection(datasetCollection).findOne({ _id: datasetid }, {
		projection: {
			_id: 1,
			name: 1,
			description: 1,
			schema: 1
		}
	})

	if (!dataset) throw Error('Dataset not found');

	return dataset;
}

data.getData = async function (req) {
	authorizeDataAnalysts(parseInt(req.uid));
	return await getDataFromDB(req);
}

data.getCSVData = async function (req, res) {
	authorizeDataAnalysts(parseInt(req.uid));

	const response = await getDataFromDB(req);

	const parser = new AsyncParser({
		transforms: [
			function (item) {
				for (let [key, value] of Object.entries(item)) {
					if (value === null) item[key] = '-';
				}
				return item
			}
		]
	});
	let csv = '';

	parser.processor
		.on('data', chunk => csv += chunk.toString())
		.on('end', () => {
			res.send(csv);
		})
		.on('error', console.log)

	parser.input.push(JSON.stringify(response));
	parser.input.push(null);
}


/**
 * @summary API handlers to do CRUD operations on dataset metadata
 * @note schema refers to dataset
 * @param {Express.Request} req
 * @returns
 */

data.getFullDatasetDetails = async function (req) {
	authorizeDevelopers(parseInt(req.uid));
	let { datasetid } = req.params;

	datasetid = validObjectId(datasetid);

	const dataset = await db.client.collection(datasetCollection).findOne({ _id: ObjectId(datasetid) })

	if (!dataset) throw Error('Dataset not found');

	dataset.data.cleanup = JSON.parse(dataset.data.cleanup);

	return dataset;
}

data.createDataset = async function (req) {
	authorizeDevelopers(parseInt(req.uid));

	const dataset = await formatRequestBodyToDataset(req.body);

	const { insertedId } = await db.client.collection(datasetCollection).insertOne(dataset);

	if (!insertedId) throw Error('Someting went wrong while creating schema');

	return insertedId;
}

data.updateDataset = async function (req) {
	authorizeDevelopers(parseInt(req.uid));

	let { datasetid } = req.params;

	datasetid = validObjectId(datasetid);

	const dataset = await formatRequestBodyToDataset(req.body);

	const { matchedCount, modifiedCount } = await db.client.collection(datasetCollection).replaceOne( { _id: ObjectId(datasetid) }, dataset );

	if (matchedCount === undefined || modifiedCount === undefined) throw Error('Someting went wrong while creating schema');
	else if (matchedCount < 1) throw Error('Schema not found');
	else if (modifiedCount < 1) throw Error('Schema not updated');

	return datasetid;
}

data.deleteDataset = async function (req) {
	authorizeDevelopers(parseInt(req.uid));

	let { datasetid } = req.params;

	datasetid = validObjectId(datasetid);

	if (!await db.client.collection(datasetCollection).findOne({ _id: datasetid })) throw Error('Schema not found');
	else {
		await db.client.collection(datasetCollection).deleteOne({ _id: datasetid });
	}

	return 'Succesfully deleted';
}