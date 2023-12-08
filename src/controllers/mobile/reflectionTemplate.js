const reflectionTemplate = module.exports;

reflectionTemplate.getCreate = async function (req, res, next) {
    res.render("mobile/reflectionTemplate/create", {
        title: "Create reflectionTemplate",
        message: "hello this is working",
    });
};
