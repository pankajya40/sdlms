"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const toc = module.exports;

/**
 * @description toc operations (GET, CREATE, UPDATE, DELETE)
 * @key req, res
 */

// Calendar operations

// toc.createCalendar = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.createCalendar(req));
// };

// toc.addCalendarInfo = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.addCalendarInfo(req));
// };

// toc.getCalendar = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.getCalendar(req));
// };

// Task  operations

// toc.createTask = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.createTask(req));
// };

// toc.getsTask = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.getsTask(req));
// };

toc.getTodos = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.getTodos(req));
};
toc.addTodo = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.addTodo(req));
};
toc.updateTodo = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.updateTodo(req));
};
toc.deleteTodo = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.deleteTodo(req));
};
toc.countUrgentImportant = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.countUrgentImportant(req));
};

// Sarpa operations

// toc.createSarpa = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.createSarpa(req));
// };

// toc.getSarpa = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.getSarpa(req));
// };

// toc.updateSarpa = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.updateSarpa(req));
// };

// toc.deleteSarpa = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.toc.deleteSarpa(req));
// };

// Journal operations

toc.createJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.createJournal(req));
};

toc.addJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.addJournal(req));
};

toc.getsJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.getsJournal(req));
};

toc.getsPublishedJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.getsPublishedJournal(req));
};

toc.updateJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.updateJournal(req));
};

toc.deleteJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.deleteJournal(req));
};


toc.addToc = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.addToc(req));
};
toc.updateToc = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.updateToc(req));
};

toc.createReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.createReflection(req));
};

toc.setLearningWeekly = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.setLearningWeekly(req));
};

toc.getLearningsPublicReflections = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.toc.getLearningsPublicReflections(req));
}

toc.updateLearningWeekly = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.updateLearningWeekly(req));
};

toc.deleteLearning = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.toc.deleteLearning(req));
};

toc.deleteSelfGrowReflection = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.toc.deleteSelfGrowReflection(req));
};

toc.updateStreak = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.updateStreak(req));
};

toc.getStreak = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.toc.getStreak(req));
};

