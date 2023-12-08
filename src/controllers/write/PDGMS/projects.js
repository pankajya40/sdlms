"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const project = module.exports;


// Project Operations
project.getProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.projects.getProject(req));
};
project.createProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.projects.createProject(req));
};
project.updateProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.projects.updateProject(req));
};
project.deleteProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.projects.deleteProject(req));
};

// _ga=GA1.2.1295218614.1661855901; _fbp=fb.1.1661855902202.95705123; _csrf=Hkfu9W3m4gSjZLR5UdoXqO-X; express.sid=s:XakQgm48hxMfIEMhOiuHD8gaB0fnUqPh.y446cen7jLp3sBKcfwR0gHbjIm0GOyWANLrMJOFN7sg; share_redirect=/forms

