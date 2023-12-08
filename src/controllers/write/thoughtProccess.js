'use strict';

const api = require('../../api');
const helpers = require('../helpers');
const winston = require("winston")

const thoughtProccess = module.exports;

thoughtProccess.getTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.getTemplate(req));
}
thoughtProccess.createTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.createTemplate(req))
}
thoughtProccess.updateTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.updateTemplate(req))
}
thoughtProccess.deleteTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.deleteTemplate(req))
}

thoughtProccess.getThoughtProccess = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.getThoughtProccess(req))
}
thoughtProccess.createThoughtProccess = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.createThoughtProccess(req))
}
thoughtProccess.updateThoughtProccess = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.updateThoughtProccess(req))
}
thoughtProccess.deleteThoughtProccess = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.thoughtProccess.deleteThoughtProccess(req))
}