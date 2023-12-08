/**
 * @date 30-04-2022
 * @author imshawan
 * @description This file contains all the valid collections in the database.
 * Please use this file for adding the new collection names here.
 */

const DEFAULT = 'objects'; // Default collection name used by nodebb

const SDLMS = {
    CURRICULUM: 'curriculums',
    THREADBUILDER: 'threadbuilders',
    ARTICLES_HOME: 'articles_home',
    TEACHING_STYLE: 'teaching_styles',
    POLL: 'polls',
    ORGANIZATION: 'organizations',  // depricated
};

const PDGMS = {
    LEAVES: 'leaves',
    TAG: 'tags',
    PROJECT: 'pdgms_projects',
    TASK: 'pdgms_tasks',
    TRAININGROI: 'trainingROI',
    TAG: 'tags',
    ORGANIZATION: 'pdgms_organizations',
};

const GLOBAL = {
    COMMENT: 'comments',
    ENQUIRY: 'enquiries',
    RUBRIC: 'rubrics',
    REQUESTS: 'requests_logs',
    TOC: 'tocs',
    // TASK:"tasks",
    JOURNAL: 'journals',
    FAQ: 'faqs',
    LEARNING_AGENDA: 'learning_agendas',
    COMMUNITYBUILDER: 'community_builders',
    CONTENT: 'contents',
    OBSERVATION: 'observations',
    GENERATORS: 'generators',
    REFLECTIVE_COMMENTS: 'reflective_comments',
    INSIGHT_SPOTTER: 'insight_spotter',
    APPLICATION_MANAGER: 'applications'
}

const MOBILE = {
    REFLECTION: 'reflections',
    REFLECTION_TEMPLATE: 'reflection_templates',
    THOUGHT_PROCCESS: "thought_proccess",
    DISCUSSION_ROOM: 'discussion_rooms_data',
};

const DT_THON = {
    NOTICE: 'notices',
};

const SCORECARD = {
    TEMPLATE: 'scorecard_templates',
    HAPPINESS: 'happiness_scorecard',
}

const SOCIAL_QUIZ = {
    TEMPLATE: 'social_quiz_templates',
    SUBMISSION: 'social_quiz_submission'
}

const SOCIAL_QUIZ_V2 = 'social_quizzes';

const PAYMENTS = {
    MODULEPURCHASEORDERS: 'module_purchase_orders', //only get
    MODULES: 'modules', /*restricted crud*/
    COCREDORDERS: 'cocred_orders', //only get
    PRICELIST: 'price_list',/*restricted crud*/
    COCREDDETAILS: 'cocred_details', // only get
    COCREDPRODUCTS: 'cocred_products' /*restricted crud*/
};
const PROFILE = {
    QUALITIES: "qualities",
    PROFILES: "profiles",
    ACCOLADES: "accolades",
    ANNECDOTES: "annecdotes",
    QUESTION: "question",
    ANSWER: "answer"
}

const COMMUNICATION = {
    TEMPLATE: "communication_templates",
    REQUEST: "communication_requests",
    REPORT: "communication_reports",
    CHANNEL: "communication_channels",
    ERROR: "communication_errordb"
}

const POSTERGENERATOR = 'poster_generator';
const DT_FORMS = 'dt_forms';


const DATACOLLECTOR = {
	FAILURE_STORE: 'data_collection_failure_store'
}
const WORKSHOMANAGER = {
    TEMPLATE: 'worshop_manager_templates',
}


const CCCMS = {
    TICKETS: 'cccms_tickets',
    REQUESTS: 'cccms_requests',
    CONSEQUENCES: 'cccms_consequence'
}

const INSIGHTREACTIONS = {
    REACTIONS: 'reactions',
}

const RIGORBUILDER = 'rigor_builder';

const MATURITYBUILDER = 'maturity_builder';

module.exports = {
    DEFAULT, SDLMS, MOBILE, DT_THON, PAYMENTS,
    GLOBAL, PROFILE, POSTERGENERATOR, SCORECARD, PDGMS, COMMUNICATION,
    DT_FORMS, SOCIAL_QUIZ, WORKSHOMANAGER, CCCMS, RIGORBUILDER, INSIGHTREACTIONS, MATURITYBUILDER,
    DT_FORMS, SOCIAL_QUIZ, WORKSHOMANAGER, RIGORBUILDER, DATACOLLECTOR, MATURITYBUILDER, SOCIAL_QUIZ_V2
};
