/**
 * 
 * @date 25-10-2022
 * @author imshawan
 * @description Utilities used for updating the organization Object.
 * 
 * As the organization is a complicated object with levels of nesting which contains more sub-documents, 
 * it's a good idea to handle operations in each sub-document as a separate db operation inorder to reduce excessive complexities in just a single function
 */

 "use strict";

const db = require('../../../database');
const utilities =  require('../../../controllers/utils');
const { ObjectId } = require('mongodb');

const utils = module.exports;
const collectionName = db.collections.PDGMS.ORGANIZATION;

utils.setLocations = async function (payload, values, organizationId) {
    const {locations} = payload;
    if (locations) {
        const newValues = parseFieldsToObject(locations, values || []);

        await db.updateField(collectionName, {_id: ObjectId(organizationId)}, {$set: {locations: newValues}});
    }
}

utils.setImages = async function (payload, values, organizationId) {
    const {images} = payload;
    if (images) {
        const newValues = parseFieldsToObject(images, values || []);

        await db.updateField(collectionName, {_id: ObjectId(organizationId)}, {$set: {images: newValues}});
    }
}

utils.setsocialLinks = async function (payload, values, organizationId) {
    const {socialLinks} = payload;
    if (socialLinks) {
        const newValues = parseFieldsToObject(socialLinks, values || []);

        await db.updateField(collectionName, {_id: ObjectId(organizationId)}, {$set: {socialLinks: newValues}});
    }
}

utils.setEmails = async function (payload, values, organizationId) {
    const {emails} = payload;
    if (emails) {
        const newValues = parseFieldsToObject(emails, values || []);

        await db.updateField(collectionName, {_id: ObjectId(organizationId)}, {$set: {emails: newValues}});
    }
}

utils.setPhoneNumbers = async function (payload, values, organizationId) {
    const {phoneNumbers} = payload;
    if (phoneNumbers) {
        const newValues = parseFieldsToObject(phoneNumbers, values || []);

        await db.updateField(collectionName, {_id: ObjectId(organizationId)}, {$set: {phoneNumbers: newValues}});
    }
}


function parseFieldsToObject (payload=[], newValues=[]) {
    if (payload && payload.length) {
        payload.forEach((item) => {
            item.id = item.id || utilities.generateUUID();
            let objIndex = newValues.findIndex(obj => item.id && obj.id == item.id);

            if (objIndex != -1) {
                Object.keys(item).forEach(key => {
                    newValues[objIndex][key] = item[key];
                });
            } else {
                newValues.push(item);
            }
        });
    } else return payload;

    return newValues;
}