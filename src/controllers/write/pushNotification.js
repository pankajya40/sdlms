const helpers = require("../helpers")
const api = require("../../api")


const pushNotification = module.exports 
pushNotification.sendNotification = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.pushNotification.sendNotification(req))
}