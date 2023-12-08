const {sendPushNotificationToUser} = require("../controllers/firebase")
const User = require("../user")
const pushNotification = module.exports

pushNotification.sendNotification = async req => {
    console.log(req.body)
    if(!(await User.isAdministrator(req.uid))) throw new Error("Must be an Admin to access this endpoint!")
    return await sendPushNotificationToUser(req.body.uid, {
        notification: {
            title: req.body.title,
            body: req.body.message
        },
        data: {
            ...req.body.data,
            url: req.body.url
        }
    })
}