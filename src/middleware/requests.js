'use strict';

const fs = require('fs');
const path = require('path');
const db = require('../database');
const {paths} = require('../constants');

const middlewares = module.exports;

middlewares.logAppDownloads = async function logAppDownloads (req, res, next) {
    if (req.url.includes('apk')) {
        if (fs.existsSync(path.join(paths.baseDir, 'public', 'uploads', 'others', req.url))) {
            await db.incrementCount(db.collections.GLOBAL.REQUESTS, {type: 'counter'}, 'appDownloads');
        }
    }

    next();
}