"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const privileges = require('../../../privileges');
const utils = require('../../utils');

const storyboard = module.exports;

storyboard.get = async function (req, res, next) {
    /**
     * @author imshawan {26-07-2022}
     * @description Redirects user to the login page if not logged in and redirects back to the project page once they successfully log in back
     */
    if (!req.uid) {
        return res.redirect('/login?share_redirect=true&url=' + req.url);
    }
   
    let { tid } = req.params;
    let uid = parseInt(req.query.uid || req.uid);

    if (!tid) throw new Error("No project tid was supplied!");
    if (!uid) throw new Error("No user id was supplied!");

    var storyboard = {};

    const [project, submissions] = await get_submission(tid, uid);

    let applicantProgress = await db.findField(db.collections.DEFAULT, {
		tid: project.tid,
		_key: `project:${project.tid}:applicant:${uid}`
	});
    let auth = await authenticateUidFordtthon(uid,tid)
    if(auth=="not allowed"){
        throw new Error("You are not authorised to access this project")
    }
    storyboard.project = project;
    storyboard.submissions = submissions;
    storyboard.isSubmissionOwner = submissions.uid == parseInt(req.uid);

    let journeyboard = false;
    if(project.tasks.length > 1) {
        journeyboard = true;
    }

    storyboard.journeyboard = journeyboard;
    if (!storyboard.project || (storyboard.project && !Object.keys(storyboard.project).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }

    if (project) {
        const { tid, tasks, status } = submissions;
        storyboard = {...storyboard, tid, tasks, status, isSubmitted: status ? status.toLowerCase() == 'submitted' : false}

        if (applicantProgress) {
            storyboard.applicantProgress = applicantProgress;
            let {currentTaskId} = applicantProgress;
            if (currentTaskId) {
                storyboard.noticeBoard = await db.findField(db.collections.DT_THON.NOTICE, {taskId: currentTaskId, type: 'notice', projectTid: tid});
            }
        }
    }

    
    storyboard.title = `${storyboard.submissions.title}-Storyboard`;

    // var sidebar = []

    // project.tasks.map((tasks) => {
    //     sidebar.push({
    //         title: tasks.task_title,
    //         id: "task-"+tasks.task_id,
    //         icon: 'fas fa fa-paper-plane'
    //     })
    // })

    // storyboard.sidebar = utils.sidebar(sidebar, 'storyboard',{
    //     classes: 'active'
    // });

    // authenticateUidFordtthon(uid,tid,next)

    res.render('dtthon/applicant/storyboard', storyboard);
};


/**
 * @author Subham Bhattacharjee
 * @param {number} tid
 * @param {number} uid
 * @returns it returns an array containing project as first element and submission as second element
 */
async function get_submission(tid, uid) {

    const [project, submission] = await Promise.all([
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid),type: 'project'}),
        db.findLatestField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'submission',uid:parseInt(uid)})
    ]);
    if(!project) throw new Error("No project found with tid: " + tid);
    if(submission) return [project, submission];
    const pid = await db.incrObjectField('global', 'nextPid');

    const scorecardId = parseInt(project.scorecardId)

	let newSubmission = {
		commitment: project.commitment,
		tasks: project.tasks,
		tid: project.tid,
		title: project.title,
	};

    newSubmission.uid = uid;
    newSubmission.pid = pid;
    newSubmission.recruiter_uid = project.uid;
    newSubmission.timestamp = new Date().getTime();
    newSubmission.status = 'in_progress';
    newSubmission.type = 'submission';
    if(scorecardId) {
		const template = await db.findField(db.collections.SCORECARD.TEMPLATE, {
			tid:scorecardId,
			type:'social_scorecard_template'
		})
		newSubmission.scorecardId = scorecardId
		newSubmission.evalStatus = 'not_started'
		newSubmission.attributes = await trimFields(template.attributes)
	}

    const [_, submissionHistoryPid] = await Promise.all([
        db.setField(db.collections.DEFAULT, newSubmission),
        db.incrObjectField("global", "nextPid")
    ]);

    await db.setField(db.collections.DEFAULT, {
		pid: submissionHistoryPid,
		uid,
		recruiter_uid: project.uid,
		currentSubmission: null,
		history: [],
		type: "submission_history",
		submission_pid: pid,
	});
    return [project, newSubmission];

}

 async function trimFields(attrs){
    return attrs.map(ele => {
        delete ele.description
        ele.subattributes = ele.subattributes.map(e => {
            delete e.description
            delete e.rubric
            delete e.ratings
            return e
        })
        return ele;
    })
}

async function authenticateUidFordtthon(uid,tid){
    console.log(uid)
    console.log(tid)
	let collectionName = db.collections.DEFAULT;
	let project = await db.findField(collectionName,{_key:`topic:${tid}`})
    console.log(project)
	if(project.isItPrivate){
		if(project.allowedTids.users.includes(`${uid}`)){
            return "allowed"
        }
        else{
            return "not allowed"
        }
	}
	else{
		return "public"
	}
}
// function show(){
//     document.getElementById('content').style.height='500px';
//     document.getElementById('content').style.display='block';
//     document.getElementById('show').style.display='none';
// }
// function hide(){
//     document.getElementById('content').style.height='0px';
//     document.getElementById('content').style.display='none';
//     document.getElementById('show').style.display='none';
// }
// $("#show").on('click',function(){
//     $("#content").show();
//   });
//   $("#hide").on('click',function(){
//     $("#content").hide();
//   });
// var faq = document.getElementsByClassName("faq-page");
// var i;
// for (i = 0; i < faq.length; i++) {
//     faq[i].addEventListener("click", function () {
//         /* Toggle between adding and removing the "active" class,
//         to highlight the button that controls the panel */
//         this.classList.toggle("active");
//         /* Toggle between hiding and showing the active panel */
//         var body = this.nextElementSibling;
//         if (body.style.display === "block") {
//             body.style.display = "none";
//         } else {
//             body.style.display = "block";
//         }
//     });
// }
