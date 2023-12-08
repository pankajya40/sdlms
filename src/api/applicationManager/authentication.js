"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const auth = module.exports;


auth.validateToken = async (req, res, next) => {}