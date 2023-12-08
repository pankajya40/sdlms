const tncController = module.exports;

tncController.getTerms = async function (req, res, next) {
    res.render("mobile/tnc/terms", {
        title: "Terms of use",
        message: "hello this is working",
    });
};

tncController.getPolicy = async function (req, res, next) {
    res.render("mobile/tnc/privacy", {
        title: "Privacy Policy",
        message: "hello this is working",
    });
};