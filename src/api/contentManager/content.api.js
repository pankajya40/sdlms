"use strict";

const db = require('../../database');
const user = require('../../user');
const utilities = require('../../controllers/utils');
const { ObjectId } = require('mongodb');
const winston = require('winston');

const contentManager = module.exports;

const collectionName = db.collections.GLOBAL.CONTENT;

const contentTypes = [
    'instagram',
    'twitter',
    'linkedin',
    'youtube'
]

const postContentFields = [
    'title',
    'content',
    'message',
    'spottedfrom',
    'source',
    'usage',
    'author',
    'contentFor'
]

/**
 * @author raman
 * @function contentManager.getContent
 * @param {*} req 
 * @param {*} paginate 
 * @description will get the content for the JT-CMS
 * @returns content as per need,
 * if @id is provided, than the particular content will be returned
 * if @filters [title, writterBy] is provided, all the relevant content will be returned with pagination
 * if none is provided, then all the content will be returned with pagination
 * 
 */
contentManager.getContent = async (req, paginate) => {
    const { id } = req.params;
    let { limit = 9, page = 0, title, author } = req.query;
    limit = parseInt(limit, 10)
    page = parseInt(page, 10)
    // get the content based on id
    let keys = {
        type: "content"
    }
    if (id && isNaN(id)) {

        if (!ObjectId.isValid(id))
            throw new Error(`Invalid contentId ${id}`)

        let content = await db.findField(collectionName, { _id: ObjectId(id), type: 'content' })
        if (!content) throw new Error(`Invalid id: ${id}, no content found`)
        let createdAt = new Date(content.createdAt);

        let [authorDetails, spotterDetails] =
            await user.getUsersFields([content.author, content.uid].map(uid => parseInt(uid, 10)), ["fullname", "username", "picture"])

        content.author = authorDetails.fullname || authorDetails.username;
        content.spotter = spotterDetails.fullname || spotterDetails.username;
        content.userpic = spotterDetails.picture
        content.usernaam = spotterDetails.username
        content.createdAt = `${createdAt.getDate()} ${createdAt.toLocaleDateString(undefined, { month: "long" })}, ${createdAt.getFullYear()}`
        return { data: content }
    } else {
        page = 0
        if (id) {
            page = id - 1
        }
    }

    // get the content based on the title
    if (title) {
        keys.title = { $in: [new RegExp(`${title}`, 'gi')] }
    }

    // get the content based on content writer
    if (author) {
        author = parseInt(author, 10)
        keys.$or = [{
            uid: author
        }, {
            author: author
        }]
    }

    // get all the content
    let [contentDocs = [], total = 0] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys)
    ])

    let uids = [...(new Set(contentDocs.map(content => content.uid)))]
    let userdata = await user.getUsersFields(uids, ["uid", "username", "picture", "fullname", "displayname"])

    let userObj;
    let data = contentDocs.map(content => {
        let createdAt = new Date(content.createdAt)

        createdAt = this.getFormattedDate(createdAt)

        content.createdAt = createdAt

        userObj = userdata.find(user => user.uid == parseInt(content.uid) && user.username)

        return {
            ...content,
            spotter: { fullname: userObj.fullname || userObj.username || userObj.displayname },
            createdAt,
            usage: content.usage
        }
    })

    if (paginate) {
        return {
            data: data,
            total: total
        }
    }

    return utilities.paginate(`/content${req.url}`, data, total, limit, page)

}

/**
 * @author raman
 * @funciton contentManger.postContent
 * @description post the content on the JT-CMS
 * @param {*} req 
 * @returns 
 */
contentManager.postContent = async (req) => {
    const uid = parseInt(req.uid);
    let currentTime = utilities.getISOTimestamp();

    // [contentTypes] is an array of types (platforms types) of content created by content creators.

    if (!contentTypes.includes(req.body.contentFor)) {
        throw new Error(`Invalid Content Type ${req.body.contentFor}`);
    }

    let payload = {
        uid,
        createdAt: currentTime,
        updatedAt: currentTime,
        type: 'content'
    }

    // [postContentFields] is an array of essential fields for posting content.

    postContentFields.map(field => {
        if (req.body[field]) {
            payload[`${field}`] = req.body[field]
        } else {
            throw new Error(`Missing field ${field}`)
        }
    })

    payload.author = parseInt(payload.author, 10)

    return await db.setField(collectionName, payload);
}

/**
 * @author raman
 * @fucntion contentManger.getFeedback
 * @description get all the feedbacks for a particular content with pagination.
 * @param {*} req 
 * @returns 
 */
contentManager.getFeedback = async (req) => {
    const uid = parseInt(req.uid);
    let { contentId } = req.params
    let { feedbackId, limit = 8, page = 0 } = req.query
    limit = parseInt(limit, 10)
    page = parseInt(page, 10)

    if (!ObjectId.isValid(contentId))
        throw new Error(`Invalid Content ID: ${contentId}`)

    let keys = {
        type: 'feedback',
        contentId: `${contentId}`
    }

    if (feedbackId) {
        if (feedbackId.length !== 24) {
            throw new Error(`Invalid Feedback ID: ${id}`)
        }
        keys._id = ObjectId(feedbackId)
        return await db.findField(collectionName, keys)
    }

    let [feedbacks = [], count = 0] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys)
    ])

    let uids = [...(new Set(feedbacks.map(feed => feed.uid)))]
    let userdata = await user.getUsersFields(uids, ["uid", "username", "picture"])


    let data = feedbacks.map(feed => {
        let createdAt = new Date(feed.createdAt)
        /// make function
        createdAt = this.getFormattedDate(createdAt)
        feed.createdAt = createdAt
        return {
            ...userdata.find(user => user && (user.uid === feed.uid)),
            ...feed
        }
    })

    return utilities.paginate(`/content${req.url}`, data, count, limit, page)
}


/**
 * @author raman
 * @function contentManager.postFeedback
 * @description will post the feedback for a content.
 * @param {*} req 
 */
contentManager.postFeedback = async (req) => {
    const uid = parseInt(req.uid, 10)
    let { contentId, feedback, rating, isApproved } = req.body

    //experiment in lodash for boolean values
    isApproved = isApproved == 'true' ? true : false
    rating = parseInt(rating)

    const fields = ['contentId', 'feedback', 'rating']

    fields.forEach(field => {
        if (!req.body[field]) {
            throw new Error(`Missing field ${field}`)
        }
    })

    if (contentId.length !== 24) {
        throw new Error(`Invalid Content ID: ${contentId}`)
    }

    const [isContentExist, doWeHaveFeedback] = await Promise.all([
        db.findField(collectionName, { _id: ObjectId(contentId), type: 'content' }),
        this.isFeedbackExist(req, contentId)
    ])

    if (!isContentExist) throw new Error(`Invalid Content ID: ${contentId}`)
    if (doWeHaveFeedback.status) throw new Error('You have already have given feedback.')

    if (rating < 1 && rating > 5) {
        throw new Error(`Invalid Rating: ${rating}`)
    }
    if (String(feedback).length == 0) {
        throw new Error(`Invalid Feedback: ${feedback}`)
    }

    const currentTime = utilities.getISOTimestamp()
    let payload = {
        uid,
        contentId,
        rating,
        feedback,
        isApproved,
        createdAt: currentTime,
        updatedAt: currentTime,
        type: "feedback"
    }


    if (isApproved) {
        await Promise.all([
            db.setField(collectionName, payload),
            db.updateField(collectionName, { _id: ObjectId(contentId), type: "content" }, { $inc: { approvalCount: 1 } })
        ])
    } else {
        await db.setField(collectionName, payload)
    }
}

/**
 * @author raman
 * @function contentManager.isFeedbackExist
 * @description will check for the existence of a feedback for the current user
 * and also don't let writer of the content to write the feedback.
 * @param contentId the content id, if used by "contentManager.postFeedback" api.
 */
contentManager.isFeedbackExist = async function (req, contentId) {

    const keys = {
        type: "feedback",
        contentId: req.params.contentId || contentId,
    }
    const uid = parseInt(req.uid, 10)

    let content = await db.findField(collectionName, { _id: ObjectId(keys.contentId), type: 'content' })

    if (content.uid === uid && content.author === uid) {
        return { status: true }
    }

    if (content.uid === uid){
        return { status: true }
    }

    if (contentId) {
        keys.uid = uid
        return { status: await db.findField(collectionName, keys) ? true : false }
    } else {

        if (!content) {
            throw new Error(`Invalid contentId: ${keys.contentId}`)
        }

        if (content.uid === uid && content.author === uid) {
            return { status: true }
        }

        keys.type = 'feedback'
        keys.uid = uid
        return { status: await db.findField(collectionName, keys) ? true : false }
    }
}

/**
 * @author raman
 * @function contentManager.getFormattedDate
 * @description Get the formatted date
 * @param {*} createdAt to format the ISO date
 * @returns formatted date
 */
contentManager.getFormattedDate = (createdAt) => {
    return `${createdAt.getDate()} ${createdAt.toLocaleDateString(undefined, { month: "long" })}, ${createdAt.getFullYear()}`
}