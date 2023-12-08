'use strict';

const Write = module.exports;

Write.users = require('./users');
Write.groups = require('./groups');
Write.categories = require('./categories');
Write.topics = require('./topics');
Write.posts = require('./posts');
Write.admin = require('./admin');
Write.files = require('./files');
Write.utilities = require('./utilities');
Write.sdlms = require('./sdlmsOps');
Write.app = require('./mobileApp');
Write.payments = require('./payments');
Write.dtThon = require("./dtThon")
Write.toc = require("./toc");
Write.userProfile = require("./userProfile")
Write.thoughtProccess = require("./thoughtProccess")
Write.pushNotification = require("./pushNotification")
Write.communication = require("./communication")
Write.socialScoresheet = require("./socialScoresheet")
Write.marketplace = require("./marketplace")
Write.socialScorecard = require("./socialScorecard")
Write.sdlmsAdmin = require('./sdlmsAdminOps');
// Write.socialQuiz = require("./socialQuiz"); Depricated
Write.socialQuiz = require("./socialQuiz.v2");
Write.PDGMS = require('./PDGMS');
Write.faq  = require('./faq')
Write.mobile = require('./mobile');
Write.gsheets = require('./gsheets');
Write.master = require('./masters');
Write.dtForms = require('./DTForms');
Write.content = require('./contentManager');
Write.observation = require('./observation');
Write.dataportal = require('./dataportal');
Write.workshopmanager = require("./workshop_manager");
Write.rigorbuilder = require("./rigorbuilder");
Write.communitybuilder = require("./CommunityBuilder");
Write.reviewReports = require('./reviewReports');
Write.generators = require('./generators');
Write.cccms = require('./CCCMS');
Write.insightSpotter = require('./insightSpotter');
Write.globals = require('./globals');
Write.happinessScorecard = require("./happinessScorecard");
Write.applicationManager = require("./applicationManager");
Write.maturitybuilder = require("./maturitybuilder");