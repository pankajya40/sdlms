"use strict";

const User = require('../../../user');
const db = require('../../../database');
const utils = require('../../utils');
const {sidebar, protectedMenus} = require('./sidebar');

const BASE = 'pdgms/leavesTracker';

const leavesTracker = module.exports;

const leaderUids = [71, 68, 100, 53, 271, 295, 62, 267]; // hardcoded leaders as of now
const collectionName = db.collections.PDGMS.LEAVES;
const userFields = [
    "username",
    "fullname",
    "userslug",
    "picture",
    "signature",
];
const leaveReasons = [
    'Medical Reasons',
    'Connection Issues',
    'Personal issues',
    'Festival/Travel/Vacation',
    'Other',
];
const commitedHours = [15, 25, 35, 50];
const commitedHoursClassification = 'hrs/week';
const validInternshipTypes = ['Internship', 'Contract', 'Full-Time Employee'];

const NEW_LEAVESTRACKER_URI = 'https://pdgms.deepthought.education/pdgms/attendance/dashboard';

leavesTracker.getDashboard = async function (req, res) {
    return res.redirect(NEW_LEAVESTRACKER_URI);

    const uid = parseInt(req.uid);

    const dashboard = {};

    dashboard.title = 'Attendance tracker dashboard';
    dashboard.sidebar = generateSidebar('dashboard',{
        classes: 'active'
    }, uid);

    const [leaveRequests, leavesApplied, leavesTaken, userData, profileData] = await Promise.all([
        db.countDocuments(collectionName, {requestedTo: uid, type: 'leave', reviewed: {$ne: true}}),
        db.countDocuments(collectionName, {uid, type: 'leave', reviewed: {$ne: true}}),
        db.countDocuments(collectionName, {uid, type: 'leave', reviewed: {$eq: true}}),
        User.getUserFields(uid, userFields),
        db.findField(collectionName, {uid, type: 'profile'}),
    ]);

    const counters = {
        leavesApplied,
        leaveRequests,
        leavesTaken,
        alternativeAssignments: 0,
        stipend: 12000
    }

    dashboard.counters = counters;
    dashboard.user = {...userData, fullname: userData.fullname || userData.username};
    dashboard.profile = profileData;
    dashboard.commitedHours = commitedHours;
    dashboard.commitedHoursClassification = commitedHoursClassification;
    dashboard.validInternshipTypes = validInternshipTypes;
    dashboard.isLeader = isLeader(uid);


    res.render(BASE + '/dashboard', dashboard);
}

leavesTracker.getLeaves = async function (req, res) {
    return res.redirect(NEW_LEAVESTRACKER_URI);
    const uid = parseInt(req.uid);

    const leaves = {};

    leaves.title = 'Leaves history';
    leaves.sidebar = generateSidebar('leaves',{
        classes: 'active'
    }, uid);

    const [userData, profileData] = await Promise.all([
        User.getUserFields(uid, userFields),
        db.findField(collectionName, {uid, type: 'profile'}),
    ]);

    leaves.commitedHoursClassification = commitedHoursClassification;
    leaves.leaders = await Promise.all(leaderUids.map( async element => User.getUserFields(element, userFields)));
    leaves.leaveReasons = leaveReasons;
    leaves.user = {...userData, fullname: userData.fullname || userData.username};
    leaves.profile = profileData;

    res.render(BASE + '/leaves', leaves);
}

leavesTracker.approve = async function (req, res) {
    return res.redirect(NEW_LEAVESTRACKER_URI);
    const uid = parseInt(req.uid);

    if (!isLeader(uid)) {
        throw new Error('Only the organization leaders are authorized to this page!')
    }

    const approve = {};

    approve.title = 'Approve leave requests';
    approve.sidebar = generateSidebar('approveleaves',{
        classes: 'active'
    }, uid);


    res.render(BASE + '/approve', approve);
}

leavesTracker.getHolidays = async function (req, res) {
    return res.redirect(NEW_LEAVESTRACKER_URI);
    const uid = parseInt(req.uid);

    const holidays = {};

    holidays.title = 'Holidays';
    holidays.sidebar = generateSidebar('holidays',{
        classes: 'active'
    }, uid);

    res.render(BASE + '/holidays', holidays);
}

leavesTracker.getStatistics = async function (req, res) {
    return res.redirect(NEW_LEAVESTRACKER_URI);
    const uid = parseInt(req.uid);

    if (!isLeader(uid)) {
        throw new Error('Only the organization leaders are authorized to this page!')
    }

    const statistics = {};

    statistics.title = 'Organization statistics';
    statistics.sidebar = generateSidebar('statistics',{
        classes: 'active'
    }, uid);

    res.render(BASE + '/statistics', statistics);
}

function isLeader(uid) {
    return leaderUids.includes(uid);
}

function generateSidebar (id, params, uid) {
    if (!isLeader(uid)) {
        return utils.sidebar(sidebar, id, params, protectedMenus)
    } else {
        return utils.sidebar(sidebar, id, params)
    }
}