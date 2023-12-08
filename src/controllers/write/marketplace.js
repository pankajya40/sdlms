const helpers = require('../helpers');
const api = require("../../api")

const marketPlaceController = module.exports;

marketPlaceController.listModules = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.listModules(req));
};


marketPlaceController.getModule = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.getModule(req));
};

marketPlaceController.createModule = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.createModule(req));
};

marketPlaceController.updateModule = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.updateModule(req));
};

marketPlaceController.deleteModule = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.deleteModule(req));
};

marketPlaceController.listSubMarkets = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.listSubMarkets(req));
};

marketPlaceController.getSubMarket = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.getSubMarket(req));
};

marketPlaceController.createSubMarket = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.createSubMarket(req));
};

marketPlaceController.updateSubMarket = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.updateSubMarket(req));
};

marketPlaceController.deleteSubMarket = async function (req, res, next) {
    helpers.formatApiResponse(200, res, await api.marketplace.deleteSubMarket(req));
};
