const utilities =  require('../../controllers/utils');

const utils = module.exports;

utils.youtubeVideoIdParser = (url) => {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v ?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[7].length == 11) {
		return match[7];
	} else {
		return;
	}
}

utils.getCurrentDayOfObservation = (observationData={}) => {
    if (!observationData || !Object.keys(observationData).length) {
        return 0;
    }

    const {createdAt} = observationData;

    const startingDate = new Date(createdAt);
    const today = new Date(utilities.getISOTimestamp());
    const differanceinTime = Math.abs(today - startingDate);
    const differanceinDays = Math.ceil(differanceinTime / (1000 * 60 * 60 * 24)); 

    return differanceinDays;
}