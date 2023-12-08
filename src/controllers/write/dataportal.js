'use strict'

const api = require("../../api")
const helpers = require("../helpers")

const data = module.exports

/**
 * @description data portal operations (GET, CREATE, UPDATE, DELETE)
 * @key req, res
 */

data.getDatasets = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.getDatasetList(req));
}

data.getDataset = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.getDatasetDetails(req));
}

data.getData = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.getData(req));
}

data.getCSVData = async function (req, res) {
	await api.dataportal.getCSVData(req, res);
}


data.getFullDatasetList = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.getDatasetList(req));
}

data.getFullDatasetDetails = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.getFullDatasetDetails(req));
}

data.createDataset = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.createDataset(req));
}

data.updateDataset = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.updateDataset(req));
}

data.deleteDataset = async function (req, res) {
	helpers.formatApiResponse(200, res, await api.dataportal.deleteDataset(req));
}