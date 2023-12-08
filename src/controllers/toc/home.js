"use strict";

const utils = require('../utils');
const { sidebar, protectedMenus } = require('./sidebar');
const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const date = require('date-and-time');
const home = module.exports;
var { settings } = require('./config');
const collectionName = db.collections.GLOBAL.TOC;
const moment = require('moment')

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}/${month}/${day}`;

home.getISOWeekNumber = (date) => {
    let fixeddate = new Date(date);
    // Set the target date to Monday of the current week
    let target = new Date(fixeddate.getTime());

    target.setDate(target.getDate() - target.getDay() + 1);

    // Get the year and week number of the target date
    let year = target.getFullYear();
    let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

    // Adjust the week number if necessary (week 1 might belong to the previous year)
    if (weekNumber === 0) {
        year--;
        weekNumber = getISOWeekNumber(new Date(year, 11, 31));
    } else if (weekNumber > 52) {
        year++;
        weekNumber = 1;
    }

    // Return the year and week number as a string
    return year + '-W' + weekNumber.toString().padStart(2, '0');
}

home.weekDuration = async (year, month, day) => {
    const today = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is Sunday
    const startOfWeek = new Date(today.setDate(diff));
    const endOfWeek = new Date(today.setDate(diff + 5)); // add 5 days for Saturday
    return `${startOfWeek.toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "long" })} - ${endOfWeek.toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "long" })}`

}

home.todo = async function (req, res, next) {
    var todo = {};
    todo.currentDate = formattedDate;
    todo.title = 'TOC-Todo';
    res.render('toc/todo/todo', todo);
};

// home.garuda = async function (req, res, next) {
//     var data = {};
//     let { year, month, day, uid } = req.params;

//     let reqUID = parseInt(uid) || 0;
//     let loggedInUID = parseInt(req.uid);

//     if (!loggedInUID) return res.redirect('/login');
//     let datenew = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
//     let time = `${year}-${month}-${String(day).padStart(2, '0')}`;

//     let isValid = date.isValid(time, 'YYYY-MM-DD');
//     if (!isValid) throw new Error('Invalid Date');
//     data.weekNum = await home.getISOWeekNumber(datenew);
//     data.reqUID = reqUID;
//     data.currentWeek = await home.getISOWeekNumber(formattedDate);
//     data.editable = data.weekNum === data.currentWeek;
//     // data.selectedWeek = getISOWeekNumber(time)
//     //data.currentWeek = `${startOfWeek.format('YYYY-MM-DD')} - ${endOfWeek.format('YYYY-MM-DD')}`
//     data.selectedDate = time;
//     data.settings = settings;
//     data.weekduration = await home.weekDuration(year,month,day)
//     data.currentDate = formattedDate;
//     data.title = 'Week';
//     data.toc = await db.findField(collectionName, { _key: data.weekNum, uid: (reqUID || loggedInUID) });

//     data.selfToc = data.toc && data.toc.uid == loggedInUID;
//     data.editable = data.editable && ((data.toc && data.toc.uid === loggedInUID) || !data.toc) && (loggedInUID && loggedInUID === reqUID || !reqUID);
//     res.render('toc/garuda/garuda', data);
// }

home.garuda = async function (req, res, next) {
    var garuda = {};
    garuda.week = req.params.week;
    console.log(garuda.week)
    garuda.title = 'Garuda Sheet';
    // // Extracting necessary parameters from the request object
    // let { year, month, day, uid } = req.params;

    // // Converting uid to an integer, or setting it to 0 if it's undefined or not a number
    let reqUID = parseInt(req.params.uid) || 0;
    console.log(req.params)
    // // Converting logged-in user ID to an integer
    let loggedInUID = parseInt(req.uid);

    // // If the user is not logged in, redirect to the login page
    if (!loggedInUID) return res.redirect('/login');

    // // Creating a new Date object from the year, month, and day parameters
    // let datenew = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    // // Creating a formatted string for the date
    // let time = `${year}-${month}-${String(day).padStart(2, '0')}`;

    // // Checking if the formatted date is valid, and throwing an error if it's not
    // let isValid = date.isValid(time, 'YYYY-MM-DD');
    // if (!isValid) throw new Error('Invalid Date');

    // // Getting the ISO week number for the date
    // data.weekNum = await home.getISOWeekNumber(datenew);

    // // Setting the reqUID property of the data object
    // data.reqUID = reqUID;

    // // Getting the current ISO week number and setting it to the currentWeek property of the data object
    // data.currentWeek = await home.getISOWeekNumber(formattedDate);

    // // Setting the editable property of the data object based on whether the week is the current week
    garuda.editable = garuda.week === home.getISOWeekNumber(moment().format("YYYY/MM/DD"));
    console.log( garuda.week === home.getISOWeekNumber(moment().format("YYYY/MM/DD")));
    console.log(home.getISOWeekNumber(moment().format("YYYY/MM/DD")))
    // // Setting the selected date property of the data object
    // data.selectedDate = time;
    if(garuda.week===home.getISOWeekNumber(moment().format("YYYY/MM/DD")))
    {
        garuda.day = moment().format('dddd')
    }
   
    // // Setting the settings property of the data object
    garuda.settings = settings;

    // // Getting the duration of the week and setting it to the weekduration property of the data object
    // data.weekduration = await home.weekDuration(year, month, day);

    // // Setting the current date property of the data object
    // data.currentDate = formattedDate;

    // // Setting the title property of the data object
    // data.title = 'Garuda Sheet';

    // // Finding the field in the database with the given _key and uid, and setting it to the toc property of the data object
    garuda.toc = await db.findField(collectionName, { _key: garuda.week, uid: (reqUID || loggedInUID) });

    // // Setting the selfToc property of the data object based on whether the logged-in user is the owner of the field
    garuda.selfToc = garuda.toc && garuda.toc.uid == loggedInUID;

    // // Setting the editable property of the data object based on whether the user is authorized to edit the field
    garuda.editable = garuda.editable && ((garuda.toc && garuda.toc.uid === loggedInUID) || !garuda.toc) && (loggedInUID && loggedInUID === reqUID || !reqUID);

    // // Rendering the Garuda template with the data object
    res.render('toc/garuda/garuda', garuda);
}

home.sarpa = async function (req, res, next) {
    var sarpa = {};
    sarpa.currentDate = formattedDate;
    sarpa.title = 'TOC-Sarpa';
    res.render('toc/sarpa/sarpa', sarpa);
};

home.grow = async function (req, res, next) {
    var grow = {};
    console.log(req.params)
    grow.week = req.params.week;
    // grow.actualCurrentDate = moment().format("YYYY/MM/DD");
    // let {year,month,date} = req.params;
    // grow.currentWeek = await home.weekDuration(year,month,date);
    // grow.ISOweek = await home.getISOWeekNumber(`${year}/${month}/${date}`);
    grow.currentDateAlpha = moment().format("MMM, DD YYYY")
    // grow.currentDate = `${year}/${month}/${String(date).padStart(2, '0')}`;
    // grow.currentDate = moment().format('YYYY/MM/DD');
    grow.learnings = await db.findFields(collectionName, { ISOweek: grow.week, uid: req.uid, type: "learning" });
    grow.reflections = await db.findFields(collectionName, { ISOweek: grow.week, uid: req.uid, type: "selfgrow-reflection" });
    grow.publicReflections = await db.findFields(collectionName, {ISOweek: grow.week, type:"learning", isPublished: "true" });
    grow.title = 'TOC-Grow';
    // grow.editable = grow.currentDate == grow.actualCurrentDate;
    res.render('toc/grow/grow', grow);
};

home.analysis = async function (req, res, next) {
    var analysis = {};
    analysis.currentDate = formattedDate;
    //demo code
    analysis.name = "mohit"
    analysis.workshop = "7th march"
    //demo code 
    analysis.title = 'TOC-Analysis';
    res.render('toc/analysis/analysis', analysis);
};

home.list = async function (req, res, next) {
    var list = {};
    list.title = 'Organization TOC';
    list.sidebar = utils.sidebar(sidebar, 'list', {
        classes: 'active'
    });

    res.render('toc/list', list);
};

home.get = async function (req, res, next) {
    var home = {};

    home.title = 'TOC';
    res.render('toc/home', home);
};
