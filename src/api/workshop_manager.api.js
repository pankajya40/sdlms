const meta = require("../meta");

const groups = require("../groups");
const _ = require("lodash");
const categories = require("../categories");
const db = require("../database");
const User = require('../user');
// const user = require("../user");
const topics = require("../topics");
const plugins = require("../plugins");
const slugify = require("../slugify");
const winston = require("winston");
const Uploader = require("../controllers/FIleUpload");
const ObjectId = require("mongodb").ObjectId;
const nconf = require("nconf");
const axios = require("axios");
const { privileges } = require("../controllers/admin");
const userPrivileges = require("../privileges");
const utilities = require("../controllers/utils");

const workshopmanager = module.exports;

const collectionName = db.collections.WORKSHOMANAGER.TEMPLATE;


/**
 * @date 14-10-2022
 * @author Abdiqafar Abukar
 * @description this CRUD functionalities of the the workshop manager required
 */

workshopmanager.getWorkshop = async (req) => {
    let uid = parseInt(req.query.uid)

    let keys = {
        status: { $in: ['published', 'started'] }
    }
    if (uid) keys.uid = uid;

    let title = req.query.title;
    if (title) keys.title = { $regex: title, $options: 'i' }

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    const [allWorkshop, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ])
    return utilities.paginate(`/workshop/${req.url}`, allWorkshop, count, limit, page)
}

workshopmanager.getPublishedWorkshop = async (req) => {
    let uid = parseInt(req.uid)

    let keys = {
        status: { $in: ['published', 'completed'] }
    }
    if (uid) keys.uid = uid;

    let title = req.query.title;
    if (title) keys.title = { $regex: title, $options: 'i' }

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    const [workshops, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ])

    // get all registered workshop and return as registered
    let upcomingWorkshops = await Promise.all(workshops.map(async (workshop) => {
        let key = {
            uid,
            pid: workshop.pid,
            registered: true
        }
        let registeredworkshop = await db.findField(collectionName, key);
        return { ...workshop, registered: registeredworkshop ? true : false }
    }))
    return utilities.paginate(`/workshop/${req.url}`, upcomingWorkshops, count, limit, page)
}

workshopmanager.createWorkshop = async (req) => {
    const uid = parseInt(req.uid);
    const pid = await db.incrObjectField('global', 'nextPid')
    const { title, duration, description } = req.body;
    const createdAt = utilities.getISOTimestamp();
    const updatedAt = utilities.getISOTimestamp();

    let payload = {
        uid,
        pid,
        title,
        duration,
        description,
        createdAt,
        updatedAt,
        status: 'published',
    }

    let result = await db.setField(collectionName, payload);
    if (result) {
        return {
            status: "success",
            message: "Workshop successfully Created",
            data: payload,
        };
    }
};

workshopmanager.updateWorkshop = async (req) => {
    const uid = parseInt(req.uid);
    const { pid } = req.body;
    const currentTime = utilities.getISOTimestamp();

    const keys = {
        uid,
        pid: pid,
        status: 'published',
    };

    const payload = {};

    ['name', 'duration', 'description'].forEach((el) => {
        if (req.body[el]) {
            payload[el] = req.body[el];
        }
    });

    payload.updatedAt = currentTime;

    let state = await db.updateField(collectionName, keys, { $set: payload });

    return {
        updated: state.result.n === 1,
    };
}

workshopmanager.deleteWorkshop = async (req) => {
    const data = req.body;
    const uid = req.uid;
    const pid = parseInt(req.params.pid);

    let keys = {
        pid,
        uid,
        status: { $in: ['published', 'completed'] }
    }

    let workshop = await db.findField(collectionName, keys);
    if (!workshop) throw new Error("No workshop Found to delete!");

    const res = await db.removeField(collectionName, keys);
    return { deleted: res.result.n > 0 }
};

workshopmanager.startWorkshop = async (req) => {
    const data = req.body;
    const pid = parseInt(data.pid);
    const uid = req.uid;

    let keys = {
        uid,
        pid,
        status: 'published',
    }

    let workshop = await db.findField(collectionName, keys);

    if (workshop.status == 'published') {
        let res = await db.updateField(collectionName, keys, {
            $set: {
                status: 'started',
            }
        });

        keys.status = 'started'
        if (res) {
            return {
                data: await db.findField(collectionName, keys),
                message: "workshop succesfully started"
            }
        }

    }
    else {
        throw new Error('Please This workshop Already Started');
    }


}

workshopmanager.completeWorkshop = async (req) => {
    const data = req.body;
    const pid = parseInt(data.pid);
    const uid = req.uid;

    let keys = {
        uid,
        pid,
        status: 'started',
    }

    let workshop = await db.findField(collectionName, keys);
    if (!workshop) throw new Error('No Workshop to Complete');

    let res = await db.updateField(collectionName, keys, {
        $set: {
            status: 'completed',
        }
    });

    keys.status = 'completed'
    if (res) {
        return {
            data: await db.findField(collectionName, keys),
            message: "workshop succesfully completed"
        }
    }
}

workshopmanager.getCompletedWorkshop = async (req) => {
    let uid = parseInt(req.query.uid)

    let keys = {
        status: 'completed',
    }

    if (uid) keys.uid = uid;

    let title = req.query.title;
    if (title) keys.title = { $regex: title, $options: 'i' }

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    const [workshop, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ])

    return utilities.paginate(`/workshop/${req.url}`, workshop, count, limit, page)
}


workshopmanager.registerWorkshop = async (req) => {
    const uid = parseInt(req.uid);
    const data = req.body
    const pid = parseInt(data.pid)
    const registered = Boolean(data.registered)
    const createdAt = Date.now();

    let keys = {
        uid,
        pid: pid,
        registered: true,
    }
    const registeredWorkshop = await db.findField(collectionName, keys);

    if (registeredWorkshop) {
        throw new Error("Workshop Already Register!");
    } else {
        let payload = {
            uid,
            pid,
            registered,
            createdAt,
        }
        let result = await db.setField(collectionName, payload);
        if (result) {
            return {
                status: "success",
                message: "Workshop successfully Registered",
                data: payload,
            };
        }
    }
}
// get all registered and attended workshop
workshopmanager.getAttendedWorkshop = async (req) => {
    let uid = parseInt(req.uid)

    let keys = {
        uid: uid,
        registered: true,
    }

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    const [attendedWorkshop, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ])

    let approvedAttendedWorkshop = await Promise.all(attendedWorkshop.map(async (workshop) => {
        if (workshop.pid) {
            let keys = {
                pid: workshop.pid,
                status: "completed"
            }
            let title = req.query.title;
            if (title) keys.title = { $regex: title, $options: 'i' }

            return await db.findField(collectionName, keys);
        }
    }))
    // console.log(approvedAttendedWorkshop)

    return utilities.paginate(`/workshop/${req.url}`, approvedAttendedWorkshop, count, limit, page)

}

















