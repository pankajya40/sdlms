 'use strict';

 const winston = require('winston');
 const adapters = require('../adapters');
 const db = require('../database/');
 const { ObjectID } = require('bson');
 
 const gSheetsApi = module.exports;
 const X_TOKEN = 'FcxoNq9mHR1xaeBJfS7dsyNDg2ApHWhFBE7mEsrD'; // Using a dummy token as of now

 gSheetsApi.wati = {};
 gSheetsApi.email = {};

 gSheetsApi.wati.notifyUser = async (req) => {
    let { body } = req;
    const parameters = [];
    const {contact, countryCode, token} = body;
    const {templateName} = req.params;

    if (token != X_TOKEN) {
        throw new Error('Invalid token supplied');
    }

    delete body.contact;
    delete body.countryCode;
    delete body.token;

    Object.keys(body).forEach((el) => {
        parameters.push({
            name: el,
            value: body[el],
        })
    });

    await adapters.whatsapp.sendTemplateMessage(countryCode + contact.trim(), templateName, 'message to candidates', parameters);
 }

 gSheetsApi.email.notifyUser = async (req) => {
    let { body } = req;
    const parameters = [];
    const {data, recipient, email, 
        subject='Response to your submission', 
        token} = body;

    const {templateId} = req.params;
    const collectionName = db.collections.COMMUNICATION.TEMPLATE;

    var compiled = email;

    if (token != X_TOKEN) {
        throw new Error('Invalid token supplied');
    }

    if (templateId) {
        if (templateId.length != 24) {
            throw new Error('Invalid template Id supplied!');
        }

        const templateData = await db.findField(collectionName, {_id: ObjectID(templateId), type: 'template'});
        if (!templateData) {
            throw new Error('No template was found with this Id');
        }

        if (!data) {
            throw new Error("Property 'data' wasn't send in the request");
        }

        compiled = adapters.email.populateVariablesWithRealData(templateData.content, data, templateData.entities);
    }

    if (!compiled) {
        throw new Error('Cannot proceed without an email body');
    }

    await adapters.email.sendCompiledEmail(recipient, compiled, subject);
 }