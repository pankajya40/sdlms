'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const dtthon = module.exports;

/**
* @description Eaglebuilder operations (GET, CREATE, UPDATE)
* @key req, res
*/

dtthon.createProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.createProject(req));
}
dtthon.editProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.editProject(req));
}
dtthon.getProjects = async (req, res) => {
	if(req.query.requirments) {
		helpers.formatApiResponse(200, res, await api.dtthon.getCustomProjects(req));
	} else {
		helpers.formatApiResponse(200, res, await api.dtthon.getProjects(req));
	}
	// helpers.formatApiResponse(200, res, await api.dtthon.getProjects(req));
}
dtthon.deleteProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.deleteProject(req));
}


dtthon.addTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.addTask(req));
}
dtthon.editTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.editTask(req));
}
dtthon.submitTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.submitTask(req));
}
dtthon.deleteTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.deleteTask(req));
}



dtthon.addAsset = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.addAsset(req));
}
dtthon.editAsset = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.editAsset(req));
}
dtthon.deleteAsset = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.deleteAsset(req));
}

dtthon.createSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.createSubmission(req))
}
dtthon.updateSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.updateSubmission(req))
}
dtthon.getSubmissions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.getSubmissions(req))
}
dtthon.submitSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.submitSubmission(req))
}
dtthon.reviewSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.reviewSubmission(req))
}


dtthon.submissionInfo = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.submissionInfo(req));
}
dtthon.updateSubmissionAsset = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.updateSubmissionAsset(req));
}
dtthon.getSubmissions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.getSubmissions(req));
}
dtthon.makeSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.makeSubmission(req));
}
dtthon.partialSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.partialSubmission(req));
}
dtthon.reviewSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.reviewSubmission(req));
}

dtthon.recordApplicant = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.recordApplicant(req));
}
dtthon.getApplicants = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.getApplicants(req));
}

dtthon.getNotice = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.getNotice(req));
}
dtthon.createNotice = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.createNotice(req));
}
dtthon.updateNotice = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.updateNotice(req));
}
dtthon.deleteNotice = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.deleteNotice(req));
}

dtthon.assignScorecard = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.assignScorecard(req));
}
dtthon.getEvaluations = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.getEvaluations(req));
}
dtthon.evaluateScorecard = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.evaluateScorecard(req));
}
dtthon.scoreAttribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.scoreAttribute(req));
}
dtthon.scoreSubattribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.scoreSubattribute(req));
}
dtthon.scoreOverall = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.scoreOverall(req));
}
dtthon.publishScore = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.publishScore(req));
}
dtthon.viewScore = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.viewScore(req));
}
dtthon.makeItPrivate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.makeItPrivate(req));
}
dtthon.makeItPublic = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.dtthon.makeItPublic(req));
}
//project specific FAQ handler
dtthon.addFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.addFaq(req));
}
dtthon.editFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.editFaq(req));
}
dtthon.deleteFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtthon.deleteFaq(req));
};

/**
 * @date 17-10-2022
 * @author imshawan
 * @function getSubmissionReport
 * @description Responds the client with the Submission Report list CSV file
 * @param {Object} req 
 * @param {Object} res 
 */
 dtthon.getSubmissionReport = async (req, res) => {
	const path = require('path');
	const { baseDir } = require('../../constants').paths;
	const {tid} = req.query;

	if (!tid) {
		throw new Error('tid is required!');
	}

	await api.dtthon.exportSubmissionReportAsCSV(req);

	res.sendFile(tid + '_submission_report.csv', {
		root: path.join(baseDir, 'build/export'),
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': `attachment; filename=${tid}_submission_report.csv`,
		},
	}, function (err) {
		if (err) {
			if (err.code === 'ENOENT') {
				throw new Error(err.message);
			}
		}
	});
}
