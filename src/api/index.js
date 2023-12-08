'use strict';

const API = module.exports;

API.users = require("./users");
API.groups = require("./groups");
API.topics = require("./topics");
API.posts = require("./posts");
API.categories = require("./categories");
API.sdlms = require("./sdlms.api");
API.appApi = require("./app.api");
API.otpApi = require("./otp.api");
API.dtthon = require("./dtthon.api");
API.toc = require("./toc.api");
API.payments = require("./payments.api");
API.marketplace = require('./marketplace.api.js');
API.profilePage = require("./profilePage.api");
API.thoughtProccess = require("./thoughtProccess.api");
API.pushNotification = require("./pushNotification.api")
API.communication = require("./communication.api");
API.socialScorecard = require("./socialScorecard.api");

API.sdlmsAdmin = require('./admin');

/**
 * @author imshawan (07-09-2022)
 * @description Added API logic controller for PDGMS, avoid using any other API logic controllers for PDGMS.
 */
API.PDGMS = require('./PDGMS');

API.faq = require("./faq.api");
API.mobile = require('./mobile');
// API.socialQuiz = require('./socialQuiz.api') Unmounted the old API logic for social quiz. Marking as depricated.
API.socialQuiz = require('./socialQuiz.v2');
API.gsheets = require('./gsheets.api');
API.master = require('./masters.api');
API.dtForms = require('./DTForms');
API.content = require('./contentManager');
API.observation = require('./observation');
API.dataportal = require('./dataportal.api');
API.workshopmanager = require('./workshop_manager.api');
API.rigorbuilder = require('./rigorbuilder.api');
API.communitybuilder = require('./CommunityBuilder');
API.generators = require('./generators');
API.cccms = require('./CCCMS');
API.globals = require('./globals');
API.insightSpotter = require('./insightSpotter');
API.happinessScorecard = require("./happinessScorecard");
API.applicationManager = require("./applicationManager");
API.maturitybuilder = require("./maturitybuilder.api");
