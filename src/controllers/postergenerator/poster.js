"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const meta = require('../../meta');
const posterGeneratorApi = require('./poster.api');
const { ObjectId } = require('mongodb');
const { create } = require("lodash");
const templateCollection = db.collections.POSTERGENERATOR;
const posterGenerator = module.exports;
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
posterGenerator.api = {};
const ERROR_IMAGE = 'https://blog.deepthought.education/wp-content/uploads/2022/08/poster_generator_error.png';

posterGenerator.getProcessedImages = async function (req, res, next) {
    let page = req.params.page;
    var perPage = meta.config.postsPerPage || 20;
    page = !isNaN(page) && page > 1 ? page - 1 : 0;

    const uid = parseInt(req.uid);
    const processedImages = {};

    const collectionName = db.collections.POSTERGENERATOR,
        keys = { type: "user:anecdotes:processed", uid }

    processedImages.title = 'Processed posters';

    const [posterData, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, perPage, page),
        db.countDocuments(collectionName, keys)
    ]);

    let posters = [];

    if (posterData.length) {
        posterData.forEach((elem) => {
            let { anecdotes } = elem;

            if (anecdotes && anecdotes.length) {
                anecdotes.forEach((el) => {
                    posters.push(el);
                })
            }
        });
    }

    processedImages.posters = posters;

    let total = (Math.ceil(count / perPage) || 1);
    let nextPage = (page + 2) > total ? (page + 1) : (page + 2);

    processedImages.pagination = {
        isPrev: page > 0,
        first: `/posters`,
        prev: `/posters/${page}`,
        current: page + 1,
        total: total,
        next: `/posters/${nextPage}`,
        last: `/posters/${total}`,
        isNext: ((page + 2) <= Math.ceil(count / perPage)),
    };

    processedImages.errorImage = ERROR_IMAGE;

    res.render('postergenerator/view_all', processedImages);
};

posterGenerator.uploadAnecdotes = async function (req, res, next) {
    var uploadAnecdotes = {};
    uploadAnecdotes.title = 'Upload anecdotes';

    uploadAnecdotes.poster = [];
    let templateName = fs.readdirSync(`src/views/postergenerator/templates/`);
    templateName.forEach((element,index) => {
        if (element.includes('.DS_Store')) {
            return;
        } else {
            let e = element.replace(".tpl", "")
            uploadAnecdotes.poster.push(e);
        }
    });

    res.render('postergenerator/upload_anecdotes', uploadAnecdotes); 
};

posterGenerator.createProfile = async function (req, res, next) {
    var imageUpload = {};
    let uid = parseInt(req.uid);
    let id = req.params._id;
    if (id) {
        let keys = {
            _id: ObjectId(id),
            type: 'user:profileimage'
        }

        imageUpload.profiles = await db.findField(templateCollection, keys);
        imageUpload.id = id
    }
    imageUpload.title = 'Create profile';
    imageUpload.uid = uid
    res.render('postergenerator/upload_image', imageUpload);
};

posterGenerator.profiles = async function (req, res, next) {
    var profiles = {};

    profiles.title = 'Profiles';


    let uid = parseInt(req.uid);

    profiles.profiles = await db.findField(templateCollection, { uid: uid, type: 'user:profileimage' });
    profiles.uid = uid;


    res.render('postergenerator/profiles', profiles)
}





// API controllers

posterGenerator.api.uploadProfileImage = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.uploadImage(req));
};

posterGenerator.api.editprofile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.editProfile(req));
};

posterGenerator.api.uploadAnecdotes = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.uploadAnecdotes(req));
};

posterGenerator.api.getProfile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.getProfile(req));
}

posterGenerator.api.profiles = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.getProfileByUid(req));
}

posterGenerator.api.editprofile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.editProfile(req))
}

posterGenerator.api.generatePid = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.generatePid(req))
}

posterGenerator.api.deleteProfile = async (req,res) => {
    helpers.formatApiResponse(200,res,await posterGeneratorApi.deleteProfile(req))
}