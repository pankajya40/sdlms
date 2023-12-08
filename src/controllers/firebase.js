/**
 * @typedef {Parameters<ReturnType<import("firebase-admin").messaging>["send"]>[0]} message
 * @typedef {ReturnType<ReturnType<import("firebase-admin").messaging>["send"]>} messageReturn
 * @typedef {Omit<message, 'topic'>} messageWithoutTopic
 */

const admin = require("firebase-admin")

const servicekeys = require("../../google-service.json")

admin.initializeApp({
    credential: admin.credential.cert(servicekeys)
})

/**
 * @author Subham Bhattacharjee
 * @param {message} message 
 * @param {boolean} dryRun 
 * @returns {messageReturn}
 */
function sendPushNotification(message, dryRun = false) {
    return admin.messaging().send(message, dryRun)
}

/**
 * @author Subham Bhattacharjee
 * @param {number} uid - uid of the user to send the message to
 * @param {messageWithoutTopic} message - message to send
 * @param {boolean} dryRun 
 * @returns {messageReturn}
 */
function sendPushNotificationToUser(uid, message, dryRun = false) {
    return sendPushNotification({
        ...message,
        topic: `user-${uid}`
    })
}

module.exports = {
    admin,
    sendPushNotification,
    sendPushNotificationToUser
}