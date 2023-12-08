'use strict'

const api = require("../../api")
const helpers = require("../helpers")

const faq = module.exports

/**
 * @description faq operations (GET, CREATE, UPDATE, DELETE)
 * @key req, res
 */


faq.getFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.getFaq(req))
}

faq.createFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.createFaq(req))
}
faq.updateFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.createFaq(req))
}
faq.deleteFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.deleteFaq(req))
}

faq.addFaQnA = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.addFaQnA(req))
}
faq.editFaQnA = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.editFaQnA(req))
}
faq.deleteFaQnA = async (req, res) => {
	helpers.formatApiResponse(200, res, api.faq.deleteFaQnA(req))
}