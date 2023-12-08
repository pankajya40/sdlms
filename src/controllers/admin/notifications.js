'use strict';

const notificationsController = module.exports;

notificationsController.get = async function (req, res) {
    res.render('admin/manage/notifications/active', {
        title: "Manage notifications",
        message: "hello this is working",
    });
};

notificationsController.getCreate = async function (req, res) {
    res.render('admin/manage/notifications/create', {
        title: "Create notifications",
        message: "hello this is working",
    });
};