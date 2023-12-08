"use strict";

const db = require('../../../database');
const User = require('../../../user');
const utilities =  require('../../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.PDGMS.ORGANIZATION;

const Members = module.exports;

Members.get = async (req) => {
    return { message: 'GET on members'}
}

Members.addOrRemoveMembers = async (req) => {
    let {uids, departmentId, organizationId} = req.body;
    const {action} = req.params;

    if (!Array.isArray(uids)) {
        if (!isNaN(uids)) {
            uids = [uids]
        } else {
            throw new Error('Uid must be a number, received ' + typeof uids);
        }
    }

    await Members.manageMembers(uids, action, departmentId, organizationId);

    return { updated: true };
}

/**
 * 
 * @date 01-11-2022
 * @author imshawan
 * @function manageMembers
 * @description Global function for managing the members for a particular department in an organization
 * Adds or removes member based on the action as supplied by the caller.
 * @param {Array} uids Array of uids
 * @param {String} action either 'add' or 'remove'
 * @param {String} departmentId Object Id as a string
 * @param {String} organizationId Object Id as a string
 */

Members.manageMembers = async (uids=[], action, departmentId, organizationId) => {
    const validActions = ['add', 'remove'];

    if (!Array.isArray(uids)) {
        throw new Error('uids must be an array, but found ' + typeof uids);
    }

    if (!uids.length) {
        throw new Error('Atleast one UID is required to perform this operation');
    }

    if (!action) {
        throw new Error('A valid action is required for performing an action on members');
    }

    if (!validActions.includes(action)) {
        throw new Error(`Invalid action: ${action}, valid actions are ${validActions.join(', ')}`);
    }

    if (!departmentId) {
        throw new Error('A valid department id is required');
    }

    if (!organizationId) {
        throw new Error('A valid organization id is required');
    }

    const [department, organization] = await Promise.all([
        db.findField(collectionName, {_id: ObjectId(departmentId), type: 'department'}),
        db.findField(collectionName, {_id: ObjectId(organizationId), type: 'organization'}),
    ]);

    if (!department) {
        throw new Error('No department was found against the department id');
    }

    if (!organization) {
        throw new Error('No organization was found against the organization id');
    }

    if (department.organizationId != organization._id) {
        throw new Error('Organization id of the department doesn\'t match with the supplied organization id');
    }

    const key = {
        _key: `department:${departmentId}:members`
    };

    await Promise.all(uids.map(async (uid) => {
        uid = parseInt(uid);
        let payload = {
            ...key,
            departmentId,
            organizationId,
            value: uid,
            createdAt: utilities.getISOTimestamp(),
            removed: action === 'add' ? 0 : 1
        };

        await db.updateField(collectionName, {...key, value: uid}, {$set: payload}, {upsert: action === 'add'});
    }));
}