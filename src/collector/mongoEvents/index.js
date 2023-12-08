const config = require('./config');
module.exports = function initMongoEvents() {
	require('./src')(config, [
		'insert',
		'update',
		'replace',
	]);
}