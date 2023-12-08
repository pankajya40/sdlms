"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {paths} = require('../../constants');
const adapter = require('../../adapters');
const moment = require('moment');

const formsAPI = module.exports;

const collectionName = db.collections.DT_FORMS;
const defaultFormSubmissionMessage = '<h6>Thankyou! Your response to the form was recorded successfully.</h6>';

formsAPI.getForms = async (req) => {
    const {id} = req.query;
    if (id) {
        return await db.findField(collectionName, {_id: ObjectId(id), type: 'form'});
    }

    const uid = parseInt(req.uid);
    const keys = {
        uid,
        type: 'form'
    };
    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [forms=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const formData = await Promise.all(forms.map( async(elem) => {
        let responseCount = await db.countDocuments(collectionName, {formId: ObjectId(elem._id), type: 'response'});
        delete elem.blocks;
        return {...elem, responseCount};
    }));

    return utilities.paginate(`/forms${req.url}`, formData, count, limit, page);
}

formsAPI.createForm = async (req) => {
    const uid = parseInt(req.uid);
    const {title, blocks, message, collectInfo, templateId} = req.body;
    const currentTime = utilities.getISOTimestamp();

    const payload = {
        uid,
        title,
        blocks,
        message,
        collectInfo: collectInfo || false,
        templateId: templateId ? templateId.trim() : '',
        createdAt: currentTime,
        updatedAt: currentTime,
        type: 'form'
    }

    let form = await db.setField(collectionName, payload);
    form && form._id && await getSharableLink(form._id);

    return form;
}

formsAPI.updateForm = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;
    const {collectInfo} = req.body;
    const currentTime = utilities.getISOTimestamp();
    const keys = {
        uid,
        _id: ObjectId(id),
        type: 'form',
    };

    const payload = {};

    ['title', 'message', 'blocks', 'templateId'].forEach((el) => {
        if (req.body[el]) {
            payload[el] = req.body[el];
        }
    });

    payload.collectInfo = collectInfo || false,
    payload.updatedAt = currentTime;

    let state = await db.updateField(collectionName, keys, {$set: payload});

    return {
		updated: state.result.n === 1,
	};
}

formsAPI.submitResponse = async (req) => {
    const uid = parseInt(req.uid);
    const {title, blocks, formId, emailId, contact, countryCode} = req.body;
    const currentTime = utilities.getISOTimestamp();

    const form = await db.findField(collectionName, {_id: ObjectId(formId)});
    if (!form) {
        throw new Error('Invalid form Id supplied');
    }

    const payload = {
        uid,
        title,
        blocks,
        formId: ObjectId(formId),
        emailId, contact, countryCode,
        createdAt: currentTime,
        updatedAt: currentTime,
        type: 'response'
    }

    const defaultFields = {
        'Timestamp': `${moment(currentTime).format("DD MMM, YYYY")}, ${moment(currentTime).format('hh:mm A')}`,
        'Email': emailId,
        'Contact': ['+', countryCode, contact].join(''),
    };

    let acknowledgement = await db.setField(collectionName, payload);

    if (form.linkedSheetId) {
        await writeRowToSpreadSheet(form, blocks, defaultFields);
    }

    if (form.collectInfo) {
        let {message} = form;
        if (!message) {
            message = defaultFormSubmissionMessage;
        }
        await adapter.email.sendCompiledEmail(emailId.trim(), message, 'Response to ' + form.title);

        if (form.templateId) {
            await adapter.whatsapp.sendTemplateMessage([countryCode.trim(), contact.trim()].join(''), form.templateId);
        }
    }

    return acknowledgement;
}

formsAPI.getRecordedResponses = async (req) => {
    const {formId} = req.params;

    const uid = parseInt(req.uid);
    const keys = {
        formId: ObjectId(formId),
        type: 'response'
    };
    const order = {_id: -1};

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const responseData = await Promise.all(responses.map( async(elem) => {
        if (elem.uid && elem.uid > 0) {
            let userData = await User.getUserFields(elem.uid, ['fullname', 'username']);
            return {...elem, user: userData};
        } else return elem;
    }));

    return utilities.paginate(`/forms${req.url}`, responseData, count, limit, page);
}

formsAPI.getMySubmissions = async (req) => {
    const uid = parseInt(req.uid);
    const keys = {
        uid,
        type: 'response',
    };
    const order = {_id: -1};

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);


    return utilities.paginate(`/forms${req.url}`, responses, count, limit, page);
}

formsAPI.authenticateSheetAndLink = async (req) => {
    const uid = parseInt(req.uid);
    const {sheetId, formId} = req.body;

    let form = await db.findField(collectionName, {_id: ObjectId(formId)});
    if (!form) {
        throw new Error('Invalid form Id was supplied');
    }
    if (form.uid != uid) {
        throw new Error('You are not authorized to update this form');
    }
    
    let subsheets = await formsAPI.getSubsheetsBySheetId(sheetId);

    await db.updateField(collectionName, {_id: ObjectId(formId)}, {$set: {linkedSheetId: sheetId}});
    
    return {message: 'Spreadsheet was linked with the form successfully', subsheets};
}

formsAPI.writeRowHeadersToSheet = async (req) => {
    const uid = parseInt(req.uid);
    const {sheetId, subsheetIndex=0, rowHeaders=[], formId} = req.body;

    if (isNaN(subsheetIndex)) {
        throw new Error('The Subsheet Index must be a number');
    }

    let form = await db.findField(collectionName, {_id: ObjectId(formId)});
    if (!form) {
        throw new Error('Invalid form Id was supplied');
    }
    if (form.uid != uid) {
        throw new Error('You are not authorized to update this form');
    }

    if (!form.linkedSheetId) {
        throw new Error('Please link the a google spreadsheet first');
    }

    if (sheetId != form.linkedSheetId) {
        throw new Error('The supplied sheetId and saved sheetId with this form doesn\'t match. Please re-link the spreadsheet and try.');
    }
    
    let sheet = await getSpreadSheet(sheetId);

    sheet = sheet.sheetsByIndex[parseInt(subsheetIndex)];
    form.subsheetIndex = parseInt(subsheetIndex);

    if (rowHeaders.length) {
        await sheet.setHeaderRow(['Timestamp', 'Email', 'Contact', ...rowHeaders]);
    }

    await db.updateField(collectionName, {_id: ObjectId(formId)}, {$set: {subsheetIndex: parseInt(subsheetIndex)}});

    const formResponses = await db.findFields(collectionName, {formId: ObjectId(formId), type: 'response'});

    if (formResponses && formResponses.length) {
        let rowsData = sortItemByTimestamp(formResponses, 'createdAt');

        rowsData = rowsData.map(response => {
            const {emailId=' ', countryCode=' ', contact=' ', blocks, createdAt} = response;
            const defaultFields = {
                'Timestamp': `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                'Email': emailId,
                'Contact': ['+', countryCode, contact].join(''),
            };

            return prepareDataForWrite(blocks, defaultFields);

        });

        writeRowsToSpreadsheet(form, rowsData); // Let the promise resolve in background without affecting the main thread
    }
    
    return {message: 'Spreadsheet information was saved with the form successfully'};
}

formsAPI.getSubsheetsBySheetId = async (sheetId) => {
    let sheet = await getSpreadSheet(sheetId);
    let subsheets = [];

    for (let index = 0; index < sheet.sheetCount; index++) {
        subsheets.push(sheet.sheetsByIndex[index].title);
    }

    return subsheets;
}

/**
 * 
 * @date 20-10-2022
 * @author imshawan
 * @function writeRowToSpreadSheet
 * @description Takes the sheetId and payload (row as JSON object) and writes it to a google sheet
 * @param {Object} form The DT Form object
 * @param {Object} data 
 */
async function writeRowToSpreadSheet (form, blocks, defaults) {
    const {linkedSheetId, subsheetIndex=0} = form;
    const data = prepareDataForWrite(blocks, defaults);
    const sheet = await getSpreadSheet(linkedSheetId);

    await sheet.sheetsByIndex[subsheetIndex].addRow(data);
}

async function writeRowsToSpreadsheet (form, data) {
    const {linkedSheetId, subsheetIndex=0} = form;
    const sheet = await getSpreadSheet(linkedSheetId);

    await sheet.sheetsByIndex[subsheetIndex].addRows(data, {insert: true});
}

function prepareDataForWrite (blocks=[], defaults={}) {
    let data = {...defaults};

    blocks.forEach(block => {

        if (isNaN(block.response) && !Array.isArray(block.response)) {
            data[block.question] = block.response;
        } else {
            if (Array.isArray(block.responseRaw)) {
                data[block.question] = block.responseRaw.join(', ');
            } else {
                data[block.question] = block.responseRaw;
            }
        }

        if (block.child && block.child.length) {

            block.child.forEach(el => {
                if (isNaN(el.response) && !Array.isArray(block.response)) {
                    data[el.question] = el.response;
                } else {
                    if (Array.isArray(block.responseRaw)) {
                        data[block.question] = block.responseRaw.join(', ');
                    } else {
                        data[el.question] = el.responseRaw;
                    }
                }
            })
        }
    });

    return data;
}

function sortItemByTimestamp (array=[], key) {
    return array.sort((firstElem, secondElem) => new Date(firstElem[key]).getTime() < (new Date(secondElem[key])).getTime());
}

/**
 * 
 * @date 20-10-2022
 * @author imshawan
 * @function getSpreadSheet
 * @description Opens a new Google Spreadsheet instance and returns back to the caller
 * @param {String} sheetId 
 * @returns Google Spreadsheet
 */
async function getSpreadSheet (sheetId) {
    const gsheetsAPI = require(paths.baseDir + 'gsheetsapi.json');

    if (gsheetsAPI) {
        const {client_id, private_key} = gsheetsAPI;

        const doc = new GoogleSpreadsheet(sheetId);

        await doc.useServiceAccountAuth({
            client_email: client_id.toString(),
            private_key: private_key.toString()
        });

        await doc.loadInfo();

        return doc;

        // console.log(doc.sheetsByIndex[subsheetIndex]);

        // return doc.sheetsByIndex[0];
        // await sheet.addRow(payload);
    }
}

async function getSharableLink(id, type='form') {
    if (!id) throw new Error('Invalid id supplied');

    const payload = {};
    const sharerCollection = db.collections.DEFAULT;
    const ONE_YEAR = (1000 * 60 * 60 * 24 * 30 * 12);
    const FIVE_YEARS = new Date((Date.now() + ONE_YEAR) * 5).getTime();
    const now = new Date();

    var asset = await db.findField(collectionName, {
        type,
        _id: ObjectId(id),
    });
    if (!asset) throw new Error(`No form Found against id: ${id}`);


    if (asset.sharer) {
        return asset.sharer;
    }

    payload.tid = id;
    payload.type = type;
    payload.parent_id = asset._id;

   //  by default + 5 year from now
    payload.expireAt = FIVE_YEARS;

    var uuid = utilities.generateUUID();
    payload.uuid = uuid + '-' + now.getTime();
    payload.pid = await db.incrObjectField('global', 'nextPid');
    const resp = await db.setField(sharerCollection, payload);
    if (!resp) throw new Error(`Unable to Generate Link at this time. Please Try again`);

    const share_id = payload.uuid;
    const keys = {
        _id: ObjectId(id),
        type: type,
    };
    asset.sharer = asset.sharer || {};
    asset.sharer.link = `/sharer?id=${share_id}`;
    asset.sharer.id = share_id;
    asset.sharer.expireAt = payload.expireAt;
    asset.sharer.count = isNaN(asset.count) ? 1 : (asset.count + 1);

    const updated = await db.updateField(collectionName, keys, {$set: {sharer: asset.sharer}});
    if (!updated) throw new Error('Link has been Generated but Can\'t save it. Please Try again in a moment');
    return asset.sharer;
}