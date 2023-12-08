const userProfileController = module.exports;
//const privileges = require('../privileges');
const db = require('../../database');
const user = require('../../user');
const helpers = require('../helpers');
const api = require("../../api")


userProfileController.getAssets = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getAssets(req))
};

userProfileController.getProfiles = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getProfiles(req))
};

userProfileController.postBio = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.postBio(req))
};

userProfileController.updateBio = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.updateBio(req))
};

userProfileController.deleteAssets = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.deleteAssets(req))
};

userProfileController.updateAssets = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.updateAssets(req))
};

userProfileController.getAccolades = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getAccolades(req))
};

userProfileController.postAccolades = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.postAccolades(req))
};

userProfileController.createQuality = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.createQuality(req))
};

userProfileController.getQualities = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getQualities(req))
};

userProfileController.showOrHideQuality = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.showOrHideQuality(req))
};

userProfileController.deleteQuality = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.deleteQuality(req))
};

userProfileController.getBatches = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getBatches(req))
};

userProfileController.updateBatches = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.updateBatches(req))
}

userProfileController.createCommunity = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.createCommunity(req))
};

userProfileController.getCommunities = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getCommunities(req))
};

userProfileController.getDiscussionRooms = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getDiscussionRooms(req))
};

userProfileController.getPosts = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getPosts(req))
};

userProfileController.showOrHideDiscussionRoom = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.showOrHideDiscussionRoom(req))
};

userProfileController.getLeaderboard = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getLeaderboard(req))
};

userProfileController.getQuestion = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getQuestion(req))
};

userProfileController.insertQuestion = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.insertQuestion(req, res))
};

userProfileController.updateQuestion = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.updateQuestion(req))
};

userProfileController.insertAnswer = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.insertAnswer(req))
};

userProfileController.getSchools = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.getSchools(req))
}
userProfileController.insertSchool = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.insertSchool(req))
}
userProfileController.updateSchool = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.updateSchool(req))
}
userProfileController.deleteSchool = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.profilePage.deleteSchool(req))

}



