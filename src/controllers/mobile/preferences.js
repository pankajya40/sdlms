const db = require('../../database');

const ignoredCategoryTypes = ['class', 'batch'];
const categoryFields = ["name", "cid", "categoryType"];

const preferencesController = module.exports;

preferencesController.getCategories = async function (req, res, next) {
    const categoriesPage = {
        title: "Categories preferences",
    };
    categoriesPage.categories = await getCategoriesData();

    res.render("mobile/preferences/categories", categoriesPage);
};

preferencesController.getStyles = async function (req, res, next) {
    res.render("mobile/preferences/learningStyles", {
        title: "Preferences Learning Styles",
        message: "hello this is working",
    });
};

preferencesController.getPresets = async function (req, res, next) {
    res.render("mobile/preferences/notificationPresets", {
        title: "Preferences Notification Presets",
        message: "hello this is working",
    });
};

preferencesController.getView = async function (req, res, next) {
    const categoriesPage = {
        title: "Categories preferences",
    };

    res.render("mobile/preferences/inApp", categoriesPage);
};