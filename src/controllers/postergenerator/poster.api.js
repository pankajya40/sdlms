"use strict";

const winston = require("winston");
const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const path = require('path');
const { paths } = require('../../constants');
const { ObjectId } = require('mongodb');

const utils = require('../utils');
const db = require("../../database");
const Uploader = require('../../controllers/FIleUpload');
const slugify = require('../../slugify');

/**
 * @author imshawan
 * @date 29-07-2022
 * @description This file contains all the APIs that are used by the poster generator
 */

const posterGeneratorApis = module.exports;
const collectionName = db.collections.POSTERGENERATOR;
const IMAGE_OUTPUT_DIR = 'public/uploads/files/posters';

let templateName; // name of the poster templates

posterGeneratorApis.uploadImage = async (request) => {
    const uid = parseInt(request.uid);
    let { name, designation } = request.body;
    let slug = slugify(name);
    const Data = { uid, name, slug, designation };
    
    if (await db.findField(collectionName, {slug})) {
        throw new Error('An entry with the name "' + name + '" already exists');
    }

    if (request.files && request.files.files) {
        const uploads = await Uploader.uploadContent(request)
        if (uploads && uploads.length !== 0) {
            uploads.forEach((file) => {
                Data[file.field] = file.url
            })
        }
    }

    Data.createdAt = Date.now();
    Data.type = 'user:profileimage';

    return await db.setField(collectionName, Data);
}

posterGeneratorApis.uploadAnecdotes = async (request) => {
    const uid = parseInt(request.uid);
    const Data = {uid};
    
    const { name, anecdote, event_name, template ,csvContents = [] } = request.body;
    templateName = template;

    if (name && anecdote) {
        csvContents.push({name, anecdote, event_name});
    }

    Data.anecdotes = csvContents;
    Data.createdAt = Date.now();
    Data.type = 'user:anecdotes'

    /**
     * @description Not using await here for invoking processCSV because that will make the request get stuck untill all the images are processed
     * Let the request pass and let the job to be done in background
     */
    processBatchPosterGeneration(csvContents, uid).then(() => { }).catch(err => console.log(err));

    return await db.setField(collectionName, Data);
}

/**
 * 
 * @author imshawan
 * @date 29-07-2022
 * @function processBatchPosterGeneration
 * @description This function is responsible for processing the anecdotes in batch and storing them in db after the process in complete
 * This function must be run in background, please DO NOT use "await" for calling this function,
 * because this process is time consuming and you might not want the current thread to be busy or your request to get stucked
 * @param {Array} anecdotes 
 * @param {Int} uid 
 */
async function processBatchPosterGeneration(anecdotes, uid) {
    let generatedOutput = [];
    let payload = { uid };

    if (!fs.existsSync(IMAGE_OUTPUT_DIR)) {
        fs.mkdirSync(IMAGE_OUTPUT_DIR, { recursive: true });
    }

    if (anecdotes && Array.isArray(anecdotes) && anecdotes.length) {
        await Promise.all(anecdotes.map( async ({name, anecdote, event_name}) => {
            let slug = slugify(name);
            let {output, designation, processedAt, success, message} = await generatePoster(name, slug, anecdote, event_name);
            if (success) {
                generatedOutput.push({ name, anecdote, designation, image: output.replace('public', '/assets'), event_name, processedAt, success });
            } else {
                generatedOutput.push({ name, processedAt, success, message });
            }
        }))
    }

    payload.anecdotes = generatedOutput;
    payload.createdAt = Date.now();
    payload.type = 'user:anecdotes:processed';

    await db.setField(collectionName, payload);
}


/**
 * 
 * @date 29-07-2022
 * @author imshawan
 * @function generatePoster
 * @description This function takes the name, slug and anecdote as the input and fetches the required data from the DB based on the slug
 * Than it loads the template, compiles it to html and generates a image out of it and saves it to local.
 * @param {String} name 
 * @param {String} slug 
 * @param {String} anecdote 
 * @returns {Object} Returns the output file path, processed time and designation of the user as an Object
 */
async function generatePoster (name, slug, anecdote, event_name) {
    let userData = await db.findField(collectionName, {slug, type: 'user:profileimage'});
    if (!userData) return {
    	processedAt: Date.now(),
    	success: false,
    	message: 'User profile information was not found in the database'
    };

    let { image, designation } = userData;
    // const usrimage = fs.readFileSync(path.join(paths.baseDir, 'public/uploads/files/csm_man-holger-von-der-heide-interview-header_807931fc5c.png'));
    const usrimage = fs.readFileSync(path.join(paths.baseDir, image.replace('/assets', 'public')));

    const base64Image = new Buffer.from(usrimage).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;
    const POSTER_TEMPLATE = `src/views/postergenerator/templates/${templateName}.tpl`;
    // let html = generateHTML(name, designation, anecdote, image);
    let html = fs.readFileSync(POSTER_TEMPLATE, 'utf8');
    let output = path.join(IMAGE_OUTPUT_DIR, slug + '-' + Date.now() + '-image.png');

    let event = event_name.split(' ');
    let event_text_1 = event[0];

    let index = event.indexOf(event_text_1);
    if (index > -1) { 
    	event.splice(index, 1); 
    }

    let event_text_2 = event.join(' ');

    await nodeHtmlToImage({
        output,
        html,
        quality: 100,
        content: { image: dataURI, name, designation, anecdote, event_text_1, event_text_2 },
        puppeteerArgs: {
            headless: true,
            args: ['--no-sandbox'],
        }
    });

    return { output, designation, processedAt: Date.now(), success: true };
}

posterGeneratorApis.getProfile = async (req) => {

    const keys={
        type: 'user:profileimage',
    }
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;

    if(req.query.id){
        const id = ObjectId(req.query.id);
        return await db.findFields(collectionName, {_id: id, type: 'user:profileimage'});
    }
    else if(req.query.name){
        const {name} = req.query;
        keys.name = { $regex: new RegExp(name.trim()), $options: '$i' };
    }

    const [poster, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName,keys),
    ]);

    return utils.paginate(`/poster${req.url}`, poster, count, limit, page);
}

posterGeneratorApis.editProfile = async (request) => {
    const id = request.params._id;

    let { name, designation } = request.body;
    const Data = {};

    if(name){
        let slug = slugify(name);
        Data.name = name;
        Data.slug = slug;
    }
    if(designation){
        Data.designation = designation;
    }
    // if (await db.findField(collectionName, {slug})) {
    //     throw new Error('An entry with the name "' + name + '" already exists');
    // }

    if (request.files && request.files.files) {
        const uploads = await Uploader.uploadContent(request)
        if (uploads && uploads.length !== 0) {
            uploads.forEach((file) => {
                Data[file.field] = file.url
            })
        }
    }
    Data.updatedAt = utils.getISOTimestamp();

    return await db.updateFieldWithMultipleKeys(collectionName, {_id:ObjectId(id)}, Data);
}

posterGeneratorApis.deleteProfile = async (request) => {
    const id = request.params.id;
    let keys = {
        _id: ObjectId(id)
    }

    const response = await db.removeField(collectionName, keys);
    return {
        deleted: response.result.n === 1
    }
        
}
// socialScorecard.editAttribute = async(req) => {
//     const data = req.body;
//     const tid = parseInt(data.tid);
//     const uid = req.uid;
//     let attributeId = parseInt(data.attributeId)
//     let {attribute} = data
//     let keys = {
//         tid,
//         uid,
//         status:"draft",
//         type:"social_scorecard_template"
//     }
//     let template = await db.findField(templateCollection, keys);
//     if(!template) throw new Error("No Template Found!");
//     let attr = template.attributes.find((e) => e.attributeId == attributeId);
//     if (!attr) throw new Error("Attribute wasn't found!");

//     let parsedItem = attr;

//     ['title', 'description', 'weightage'].forEach(field => {
//         if(attribute[field]){
//             parsedItem[field] = attribute[field];
//         }
//     })

//     let attrs = template.attributes.filter(e => e.attributeId!=attributeId);
//     attrs.push(parsedItem);
//     let res = await db.updateField(templateCollection, keys, { $set: {attributes: attrs} }, {upsert: false});
//     if(!res) throw new Error("Unauthorized write access!");
//     return {
//         updated: res.result.nModified,
//         template: await db.findField(templateCollection, keys)
//     }
// }