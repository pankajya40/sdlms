const notificationController = module.exports;

notificationController.getHome = async function (req, res, next) {
    res.render("mobile/notification/home", {
        title: "Notifications Home",
        message: "hello this is working",
    });
};

notificationController.getSpecific = async function (req, res, next) {
    res.render("mobile/notification/specific", {
        title: "Notifications Specific",
        message: "hello this is working",
    });
};