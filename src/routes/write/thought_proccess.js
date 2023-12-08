const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");
const {
    $getTemplate,
    $deleteTemplate,
    $getThoughtProccess,
    $createThoughtProccess,
    $updateThoughtProccess,
    $deleteThoughtProccess
} = require("../../schema/write/thought_proccess")

const setupApiRoute = routeHelpers.setupApiRoute;

module.exports = () => {
    const middlewares = [middleware.authenticate];
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
    const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    const { typedFieldValidation } = middleware.typedValidation;
    setupApiRoute(router, "get", "/template", [typedFieldValidation($getTemplate)], controllers.write.thoughtProccess.getTemplate)
    setupApiRoute(router, "post", "/template", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware, middleware.checkRequired.bind(null, ['blocks', 'title', 'description']), middleware.checkRequiredFiles.bind(null, ['image'])], controllers.write.thoughtProccess.createTemplate)
    setupApiRoute(router, "put", "/template", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.write.thoughtProccess.updateTemplate)
    setupApiRoute(router, "delete", "/template", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, typedFieldValidation($deleteTemplate)], controllers.write.thoughtProccess.deleteTemplate)

    setupApiRoute(router, "get", "/", [typedFieldValidation($getThoughtProccess)], controllers.write.thoughtProccess.getThoughtProccess)
    setupApiRoute(router, "post", "/", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['blocks', 'parentPid'])], controllers.write.thoughtProccess.createThoughtProccess)
    //  setupApiRoute(router, "put", "/", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, typedFieldValidation($updateThoughtProccess)], controllers.write.thoughtProccess.updateThoughtProccess)
    // setupApiRoute(router, "delete", "/", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, typedFieldValidation($deleteThoughtProccess)], controllers.write.thoughtProccess.deleteThoughtProccess)

    return router
}