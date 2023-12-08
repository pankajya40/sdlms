"use strict";

const toc = module.exports;
var { settings } = require('./config');
const utils = require('../utils');
const db = require("../../database");
const date = require('date-and-time');

toc.home = require("./home");

const collectionName = db.collections.GLOBAL.TOC;

toc.calendar = {
    get: async function (req, res, next) {
        var data = {};
        let { year, month, day, uid } = req.params;
        
        let reqUID = parseInt(uid) || 0;
        let loggedInUID = parseInt(req.uid);

        if (!loggedInUID) return res.redirect('/login');
        let datenew = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        let time = `${year}-${month}-${String(day).padStart(2, '0')}`;
        let  getISOWeekNumber = (date) => {
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
        let isValid = date.isValid(time, 'YYYY-MM-DD');
        if (!isValid) throw new Error('Invalid Date');
        data.weekNum = getISOWeekNumber(datenew);
        data.reqUID = reqUID;
        data.editable = date.isSameDay(new Date(), new Date(time));
        
       // data.selectedWeek = getISOWeekNumber(time)
        data.selectedDate = time;
        data.settings = settings;
        
        data.title = 'Week';
        data.toc = await db.findField(collectionName, { _key: data.weekNum, uid: (reqUID || loggedInUID) });
        data.selfToc = data.toc && data.toc.uid == loggedInUID;
        data.editable = data.editable && ((data.toc && data.toc.uid === loggedInUID) || !data.toc) && (loggedInUID && loggedInUID === reqUID || !reqUID);
        res.render('toc/garuda/single', data);
    }

}