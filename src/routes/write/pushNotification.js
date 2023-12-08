const router = require("express").Router()
const middleware = require("../../middleware");
const routeHelpers = require("../helpers");
const controllers = require("../../controllers")

const setupApiRoute = routeHelpers.setupApiRoute;


module.exports = () => {
    setupApiRoute(router, 'post', '/send', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.pushNotification.sendNotification)
    return router
}
