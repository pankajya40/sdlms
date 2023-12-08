"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");
const {
    $createProject,
    $editProject,
    $getProjects,
    $deleteProject,
    $addTask,
    $editTask,
    $deleteTask,
    $addAsset,
    $editAsset,
    $deleteAsset,
    $reviewSubmission,
    $createSubmission,
    $updateSubmission,
    $submitSubmission,
    $getSubmissions,
    $addFaq,
    $editFaq,
    $deleteFaq,
} = require("../../schema/write/dt_thon")

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Shubham Bawner
 * @description This file handles all the custom routes that are required for the DtThon to function. 
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
    const {typedFieldValidation, Fields} = middleware.typedValidation

    
    // setupApiRoute(router, 'post', '/project', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($createProject)], controllers.write.dtThon.createProject);
    setupApiRoute(router, 'post', '/project', [...middlewares, typedFieldValidation($createProject)], controllers.write.dtThon.createProject);



    setupApiRoute(router, 'put', '/project', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($editProject)], controllers.write.dtThon.editProject);
    setupApiRoute(router, 'get', '/project', [typedFieldValidation($getProjects)], controllers.dtThon.getProjects);
    setupApiRoute(router, 'delete', '/project', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($deleteProject)], controllers.write.dtThon.deleteProject);
    
    setupApiRoute(router, 'post', '/task', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($addTask)], controllers.write.dtThon.addTask);
    setupApiRoute(router, 'put', '/task', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($editTask)], controllers.write.dtThon.editTask);
    setupApiRoute(router, 'put', '/task/submit', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($editTask)], controllers.write.dtThon.submitTask);
    setupApiRoute(router, 'delete', '/task', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($deleteTask)], controllers.write.dtThon.deleteTask);

    setupApiRoute(router, 'post', '/asset', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($addAsset)], controllers.write.dtThon.addAsset);
    setupApiRoute(router, 'put', '/asset', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($editAsset)], controllers.write.dtThon.editAsset);
    setupApiRoute(router, 'delete', '/asset', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($deleteAsset)], controllers.write.dtThon.deleteAsset);
    
    setupApiRoute(router, "post", "/submission", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($createSubmission)], controllers.write.dtThon.createSubmission)
    setupApiRoute(router, "put", "/submission", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($updateSubmission)], controllers.write.dtThon.updateSubmission)
    setupApiRoute(router, 'put', '/submission/asset', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation(new Fields()
        .id("pid", {required: true})
        .id("task_id", {required: true})
        .object("asset", new Fields()
            .id("asset_id", {required: true})
            .id("content_pid")
            .any("content")
        )
    )], controllers.write.dtThon.updateSubmissionAsset)
    setupApiRoute(router, "get", "/submission", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($getSubmissions)], controllers.write.dtThon.getSubmissions)
    setupApiRoute(router, "post", "/submit/partial", [...middlewares,middleware.authenticateOrGuest, middleware.isLoggedin, typedFieldValidation(new Fields()
        .id("pid", {required: true})
        .id("task_id", {required: true})
        .id("asset_id"))], controllers.write.dtThon.partialSubmission);
    setupApiRoute(router, "post", "/submit", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($submitSubmission)], controllers.write.dtThon.submitSubmission)
    setupApiRoute(router, "post", "/review", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($reviewSubmission)], controllers.write.dtThon.reviewSubmission)
  
    // setupApiRoute(router, 'post', '/submit', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($submissionInfo)], controllers.write.dtThon.submissionInfo);
    // setupApiRoute(router, 'get', '/submit', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($getSubmissions)], controllers.write.dtThon.getSubmissions);
    // setupApiRoute(router, 'put', '/submit', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($makeSubmission)], controllers.write.dtThon.makeSubmission);
    // setupApiRoute(router, 'put', '/review', [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($reviewSubmission)], controllers.write.dtThon.reviewSubmission);

    setupApiRoute(router, "put", "/project/:tid/apply", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.recordApplicant)
    setupApiRoute(router, "get", "/project/:tid/applicants", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.getApplicants)

    setupApiRoute(router, "get", "/notice", [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.getNotice)
    setupApiRoute(router, "put", "/notice/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.updateNotice)
    setupApiRoute(router, "post", "/notice", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['taskId', 'taskNumber', 'projectTid', 'notice'])], controllers.write.dtThon.createNotice)
    setupApiRoute(router, "delete", "/notice/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.deleteNotice)

    //  scorecard
    setupApiRoute(router, "put", "/scorecard/assign", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['tid', 'scorecardId'])], controllers.write.dtThon.assignScorecard)
    setupApiRoute(router, "put", "/makeItPrivate/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.makeItPrivate)
    setupApiRoute(router, "put", "/makeItPublic/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.makeItPublic)
    setupApiRoute(router, "get", "/scorecard/evaluations", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.getEvaluations)
    setupApiRoute(router, "put", "/scorecard/evaluate", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['tid', 'uid'])], controllers.write.dtThon.evaluateScorecard)
    setupApiRoute(router, "put", "/scorecard/score/attribute", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['attributeId', 'tid', 'uid'])], controllers.write.dtThon.scoreAttribute)
    setupApiRoute(router, "put", "/scorecard/score/subattribute", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['attributeId', 'tid', 'uid', 'subattributeId'])], controllers.write.dtThon.scoreSubattribute)
    setupApiRoute(router, "put", "/scorecard/score/overall", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['tid', 'uid'])], controllers.write.dtThon.scoreOverall)
    setupApiRoute(router, "put", "/scorecard/score/publish", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['tid', 'uid'])], controllers.write.dtThon.publishScore)
    setupApiRoute(router, "get", "/scorecard/view", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.viewScore)

    // faq 
    setupApiRoute(router, "post", "/faq", [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null,['question', 'answer'])], controllers.write.dtThon.addFaq)
    setupApiRoute(router, "put", "/faq", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($editFaq)], controllers.write.dtThon.editFaq)
    setupApiRoute(router, "delete", "/faq", [...middlewares, middleware.authenticateOrGuest, typedFieldValidation($deleteFaq)], controllers.write.dtThon.deleteFaq)
    
    // Download CSV report of the users submitted the project
    setupApiRoute(router, "get", "/csv/submission/report", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtThon.getSubmissionReport)

    return router;
}