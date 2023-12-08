const db = require("../../database");
const meta = require('../../meta');
const utilities = require('../../controllers/utils');

const assetsExplore = module.exports;
const validAssetTypes = ['eaglebuilder', 'threadbuilder', 'article', 'post'];

assetsExplore.getAssets = async (req, res) => {
	const uid = parseInt(req.uid);
    const collectionName = db.collections.DEFAULT;
    
    let {term, limit=8, page=0, type} = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    if (type && !validAssetTypes.includes(type)) {
        throw new Error('Invalid asset type: ' + type);
    }

    const keys = {
		$or: [{
			userId: uid,
		}, {
			uid: uid,
		}],
		type: type ? type : {
			$in: validAssetTypes,
		},
	};

    if (term) {
        term = new RegExp(term);
        keys['$or'] = [{title: {$regex: term, $options: '$i'}}, {content: {$regex: term, $options: '$i'}}];
    }

	const [assetsData=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

    let data = assetsData.map((item) => {
        let assetData = {}
        if (item.type && item.type == 'threadbuilder') {
            let { threads, tid, pid, type, _id } = item;
    
            if (threads.length) {
                let { subthreads } = threads[0];
                if (subthreads && subthreads.length) {
                    assetData = {...subthreads[0], tid, pid, type, _id};
                }
            }

        } else if (item.type && item.type == 'eaglebuilder') {
            let { tracks, tid, pid, type, _id } = item;
    
            if (tracks.length) {
                let { subtracks } = tracks[0];
                if (subtracks && subtracks.length) {
                    assetData = {...subtracks[0], tid, pid, type, _id};
                }
            }

        } else assetData = item;

        let title = assetData.title ? assetData.title : '';
        let content = assetData.content ? assetData.content : '';

        return { 
            ...assetData, 
            title: `${utilities.htmltoText(title).substr(0, 25)}...`,
            content: `${utilities.htmltoText(content).substr(0, 35)}...`
        }
    });

    return utilities.paginate(`/app${req.url}`, data, count, limit, page);
};