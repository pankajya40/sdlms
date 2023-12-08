const db = require("../database");
const utils = require("../controllers/utils");
const Uploader = require("../controllers/FIleUpload");
const { constants } = require('../constants');
const groups = require('../groups');

const ProfilePage = module.exports

/**
 * 
 * @function getAssets
 * @description Gets latest assets of the user (default is 5 assets)
 * @param {*} req 
 * @returns 
 */

ProfilePage.getAssets = async (req) => {                    //  Gets latest assets of the user

    const CollectionName = db.collections.DEFAULT;          //  Fetching collection name, loggedin user id
    const uid = parseInt(req.uid); 
    let type = req.query.type;                              // Accepting the asset type from the query

    if (type && !utils.isValidAssetType(type)) {            // If type of asset is invalid (e.g. rajnikant builder)
        throw new Error('Invalid asset type: ' + type);
    }
   
    let keys = {};

    if (!type) {                                            //  Query with user Id, asset type
        keys = {
            $or: [{userId: uid}, {uid: uid}],
            type: {
                $in: constants.validAssetTypes              //  Search all assets - asset agnostic query was raised
            }
        }
    }
    else {
        keys = {
            $or: [{userId: uid}, {uid: uid}],               //  Type was given
            type
        }
    }
    
    const page = req.query.page || 0                        // Pagination limits
    const limit = req.query.limitBy || 5

    const [assets, count] = await Promise.all([
        db.getFieldsWithPagination(CollectionName, keys, limit, page, {timestamp: -1}),
        db.countDocuments(CollectionName, keys)
    ])

    return utils.paginate(req.url, assets, count, limit, page)
}

/**
 * @author Surojit
 * @date 29-06-2022
 * @description This function adds a new quality for a particular user
 */
ProfilePage.createQuality = async req => {
    const QUALITY = db.collections.PROFILE.QUALITIES;
    let tid;

    const uid = parseInt(req.uid)
    if(!uid || uid < 1) throw new Error("Unauthorised")

    if (req.body.tid) {
        tid = parseInt(req.body.tid);
        console.log(tid);
        if (tid < 1 || !tid) throw new Error("Invalid tid");
    }

    const key = { type: "qualities", "tid": tid}

    let quality_id = await db.incrObjectField('global', 'nextPid');
    console.log(quality_id);

    try {
        const payload = {
            quality_id,
            quality_type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            annecdotes: [],
            questions: [],
            isVisible: true
        }
        // console.log(payload);
        console.log(req.files);
        if (req.files && req.files.files) {
            const uploads = await Uploader.uploadContent(req)
            if (uploads && uploads.length !== 0) {
                uploads.forEach((file) => {
                    if (file.field != 'image') return;
                    payload[file.field] = file.url;
                })
            }
        }

        const result = await db.updateField(QUALITY, key, { $push : {"qualities" : payload }});
        // console.log(result)
        return result

    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 
 * @description This function gets profile based on tid or gets profile based on page and limitBy
 */
ProfilePage.getProfiles = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        console.log(req.query.tid);
        if (req.query.tid) {
            let tid = parseInt(req.query.tid);
            console.log(tid);
            if (tid < 1 || !tid) throw new Error("Invalid tid");

            const profile = await db.findField(PROFILE, { ...keys, tid });
            if (!profile) throw new Error("Cannot get profile by TID");
            return profile;
        }
        
        const limitBy = parseInt(req.query.limitBy) || 8;
        const page = parseInt(req.query.page) || 0;
        
        const [profiles, count] = await Promise.all([
            db.getFieldsWithPagination(PROFILE, keys, limitBy, page),
            db.countDocuments(PROFILE, keys),
        ]);
        return utils.paginate(`/profile${req.url}`, profiles, count, limit, page);
        
    } catch(err) {
        console.log(err.message);
    }
}

ProfilePage.postBio = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const ACCOLADE = db.collections.PROFILE.ACCOLADES;
    const QUALITY = db.collections.PROFILE.QUALITIES;
    const ANNECDOTE = db.collections.PROFILE.ANNECDOTES;

    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");

    try {
        let tid = await db.incrObjectField("global", "nextTid");
        let type = 'profile';
        let accoladesPid = await db.incrObjectField('global', 'nextPid');
        let annecdotesPid = await db.incrObjectField('global', 'nextPid');
        let qualitiesPid = await db.incrObjectField('global', 'nextPid'); 

        if (!req.body.bio) throw new Error ("No Bio");
        const bio = req.body.bio;

        await db.setField(ACCOLADE, {
            uid: luid,
            tid: tid,
            pid: accoladesPid,
            accolades: [],
            type: 'accolades'
        })

        await db.setField(ANNECDOTE, {
            uid: luid,
            tid: tid,
            pid: annecdotesPid,
            annecdotes: [],
            type: 'profile_annecdotes'
        })

        await db.setField(QUALITY, {
            uid: luid,
            tid: tid,
            pid: qualitiesPid,
            qualities: [],
            type: 'qualities'
        })
            
        const memberships = {
            communities: []
        };
        const assets = [];
            
        const payload = { bio , tid, type, keys, accoladesPid, qualitiesPid, memberships, annecdotesPid, assets };
    
        const result = await db.setField(PROFILE, payload);
        console.log(result)
        return result
    }
    catch (err) {
        console.log(err.message);
    }
}

ProfilePage.updateBio = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        if (req.body.tid) {
            let tid = parseInt(req.body.tid);
            if (tid < 1) throw new Error("Invalid tid");
            const bio = req.body.bio; 
            const payload = {"bio" : bio};
            const key = {
                type: "profile",
                "tid": tid,
            }
            console.log(payload)
            const result = await db.update(PROFILE, key, {$set : payload});
            // const result = await db.myUpdate(PROFILE, key, { $set: {"bio" : bio}})
            return result
        }
    } catch (err) {
        console.log(err);
    }

}

ProfilePage.getProfiles = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        console.log(req.query.tid);
        if (req.query.tid) {
            let tid = parseInt(req.query.tid);
            console.log(tid);
            if (tid < 1 || !tid) throw new Error("Invalid tid");

            const profile = await db.findField(PROFILE, { ...keys, tid });
            if (!profile) throw new Error("Cannot get profile by TID");
            return profile;
        }
        
        const limitBy = parseInt(req.query.limitBy) || 8;
        const page = parseInt(req.query.page) || 0;
        
        const [profiles, count] = await Promise.all([
            db.getFieldsWithPagination(PROFILE, keys, limitBy, page),
            db.countDocuments(PROFILE, keys),
        ]);
        return utils.paginate(`/profile${req.url}`, profiles, count, limit, page);
        
    } catch(err) {
        console.log(err.message);
    }
}

ProfilePage.postBio = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    console.log('hi');
    if (!req.uid || luid < 1) throw new Error("Unauthorized");

    try {
        let tid = await db.incrObjectField("global", "nextTid");
        let type = 'profile';
        let accoladesPid = await db.incrObjectField('global', 'nextPid');
        let annecdotesPid = await db.incrObjectField('global', 'nextPid');
        let qualitiesPid = await db.incrObjectField('global', 'nextPid'); 

        if (!req.body.bio) throw new Error ("No Bio");
        const bio = req.body.bio;

        await db.setField(PROFILE, {
            uid: luid,
            tid: tid,
            pid: accoladesPid,
            accolades: [],
            type: 'accolades'
        })

        await db.setField(PROFILE, {
            uid: luid,
            tid: tid,
            pid: annecdotesPid,
            annecdotes: [],
            type: 'profile_annecdotes'
        })

        await db.setField(PROFILE, {
            uid: luid,
            tid: tid,
            pid: qualitiesPid,
            qualities: [],
            type: 'qualities'
        })
            
        const memberships = [];
        const assets = [];
            
        const payload = { bio , tid, type, keys, accoladesPid, qualitiesPid, memberships, annecdotesPid, assets };
    
        const result = await db.setField(PROFILE, payload);
        console.log(result)
        return result
    }
    catch (err) {
        console.log(err.message);
    }
}

ProfilePage.updateBio = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        if (req.body.tid) {
            let tid = parseInt(req.body.tid);
            if (tid < 1) throw new Error("Invalid tid");
            const bio = req.body.bio; 
            const payload = {"bio" : bio};
            const key = {
                type: "profile",
                "tid": tid,
            }
            console.log(payload)
            const result = await db.update(PROFILE, key, {$set : payload});
            return result
        }
    } catch (err) {
        console.log(err);
    }

}

ProfilePage.deleteAssets = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);

    try {
        if (req.body.tid) {
            let tid = parseInt(req.body.tid);
            console.log(tid);
            if (tid < 1) throw new Error("Invalid tid");

            const key = {
                "tid": tid,
                type: "profile",
            }
            console.log(req.body.assets)
            const assets = req.body.assets;
            // const payload = {"assets": req.body.assets}
            const result = await db.update(PROFILE, key, { $pull : {"assets" : {$in: [4]}}});
            return result;
        }

    } catch (err) {
        console.log(err)
    }
}

ProfilePage.updateAssets = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const keys = { type: "profile" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        if (req.body.tid) {
            let tid = parseInt(req.body.tid);
            if (tid < 1) throw new Error("Invalid tid");
            const assets = req.body.assets; 
            const payload = {assets};
            const key = {
                type: "profile",
                "tid": tid,
            }
            console.log(payload)
            const result = await db.update(PROFILE, key, { $push : {"assets" : {$each: assets}}});
            console.log(result)
            return result
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * @author Surojit
 * @date 02-07-2022
 * @description This function will get all the accolades
 */
ProfilePage.getAccolades = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const ACCOLADE = db.collections.PROFILE.ACCOLADES;
    const key = { type: "profile" };
    const keys = { type: "accolades" };
    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        console.log(req.query.tid);
        if (req.query.tid) {
            let tid = parseInt(req.query.tid);
            console.log(tid);
            if (tid < 1) throw new Error("Invalid tid");

            const profile = await db.findField(PROFILE, { ...key, tid });
            if (!profile) throw new Error("Cannot get profile by TID");
            console.log(profile)
            const result = await db.findField(ACCOLADE, { ...keys, tid });
            return result;
        }
       
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 02-07-2022
 * @description This function will insert a particular accolade in accolades array inside accolades collection
 */
ProfilePage.postAccolades = async (req) => {
    const ACCOLADE = db.collections.PROFILE.ACCOLADES;
    console.log('Hi');

    const uid = parseInt(req.uid);
    if (!uid || uid < 1) throw new Error("Unauthorized");

    const tid = parseInt(req.body.tid);
    if (tid < 1 || !tid) throw new Error("Invalid TID");

    const keys = { type: "accolades", "tid": tid};

    let accolade_id = await db.incrObjectField('global', 'nextPid');

    try {
        const payload = {
           accolade_id,
           author_uid: req.body.author_uid,
           content: req.body.content,
           timestamp: Date.now()
        }
        console.log(payload);
        const result = await db.updateField(ACCOLADE, keys, { $push : {"accolades" : payload }});
        console.log(result);
        return result
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 30-06-2022
 * @description This function gets qualities depending upon quality_type(persona, competency, etc)
 */
ProfilePage.getQualities = async (req) => {
    const QUALITY = db.collections.PROFILE.QUALITIES;
    const keys = { type: "qualities" }
    const luid = parseInt(req.uid);
    const quality_type = req.body.quality_type;

    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        const tid = req.body.tid
        if (tid) {
            let tid = parseInt(req.body.tid);
            console.log(tid);
            if (tid < 1 || !tid) throw new Error("Invalid tid");
        }

        let qualities = await db.findField(QUALITY, { ...keys, tid });

        qualities = qualities.qualities;

        qualities = qualities.filter(quality => quality.quality_type === quality_type && quality.isVisible === true);
        return qualities;

    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 30-06-2022
 * @description This function will delete particular quality based on quality_id
 */
ProfilePage.deleteQuality = async(req) => {
    const QUALITY = db.collections.PROFILE.QUALITIES;
    
    const luid = parseInt(req.uid);

    if (!req.uid || luid < 1) throw new Error("Unauthorized");

    try {
        let tid;
        if (req.body.tid) {
            tid = req.body.tid;
            if (tid < 0 || !tid) throw new Error('Invalid Tid');
        }
        let quality_id;
        if (req.body.quality_id) {
            quality_id = req.body.quality_id;
            if (quality_id < 0 || !quality_id) throw new Error('Invalid Quality id');
        }
        const keys = { type: "qualities" , tid }
        console.log(keys);
        console.log(tid);
        const result = await db.update(QUALITY, keys, { $pull : {"qualities" : { quality_id }}});
        return result



    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 01-06-2022
 * @description This function will delete particular quality based on quality_id
 */
ProfilePage.showOrHideQuality = async (req) => {
    const QUALITY = db.collections.PROFILE.QUALITIES;
    const luid = parseInt(req.uid);

    if (!req.uid || luid < 1) throw new Error("Unauthorized");

    try {
        let tid;
        if (req.body.tid) {
            tid = req.body.tid;
            if (tid < 0 || !tid) throw new Error('Invalid Tid');
        }
        let quality_id;
        if(req.body.quality_id) {
            quality_id = req.body.quality_id;
            if (quality_id < 0 || !quality_id) throw new Error('Invalid Quality ID');
        }
        const isVisible = req.body.isVisible;

        const keys = { type: "qualities" , "qualities.quality_id": quality_id }
        //await db.update(QUALITIES,{"qualities.isVisible":true},{$set:{"qualities.$.isVisible":false}})
        const result = await db.updateField(QUALITY, keys, { $set: { "qualities.$.isVisible": isVisible } } )
        return result;
        
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 06-07-2022
 * @description This function gets batches of a particular user uid
 */
ProfilePage.getBatches = async (req) => {
    const collectionName = db.collections.DEFAULT;
    const uid = parseInt(req.uid);
    const fields = ['categoryType', 'cid', 'description','name','parentCid', 'batchType', 'cohortName'];

    let data = await groups.getUserGroups([uid]);
    data = data[0] || [];

    if (data.length) {
        let batches = await Promise.all((data.filter(elem => elem.type == 'cohort') || []).map(async (elem) => {
            return await db.findField(collectionName, { cohortName: elem.name, categoryType: 'batch' }, fields);
        }));
        return (batches || []).filter(elem => elem);
    } else return [];
}
 
 ProfilePage.updateBatches = async req => {
    try {
        const del = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $pull: { "memberships.batches": parseInt(req.params.id) } })
        const ins = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $push: { "memberships.batches": parseInt(req.body.batch) } })

        if (del.updated == ins.updated == true) {
            return true;
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @author Surojit
 * @date 06-07-2022
 * @description This function creates new community
 * dummy api because data model is not yet finalized for community
 */
ProfilePage.createCommunity = async (req) => {

    const COMMUNITY = db.collections.COMMUNITY.COMMUNITY;
    const keys = { type: "community "};

    try{
        // console.log(req.body);
        const tid = await db.incrObjectField("global", "nextTid");

        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");

        if (!req.body.title) throw new Error ("No Title");
        const title = req.body.title;

        if (!req.body.description) throw new Error ("No Description");
        const description = req.body.description;

        const members = [];

        const timestamp = Date.now();

        payload = {
            tid,
            luid, 
            title, 
            description, 
            members, 
            timestamp,
            type: "community",
            isVisible: true
        };

        if (req.files && req.files.files) {
            const uploads = await Uploader.uploadContent(req)
            if (uploads && uploads.length !== 0) {
                uploads.forEach((file) => {
                    if (file.field != 'image') return;
                    payload[file.field] = file.url;
                })
            }
        
        }
        // console.log(payload);
        const result = await db.setField(COMMUNITY, payload);
        // console.log(result);
        return result;
        
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 07-07-2022
 * @description This function get communities which you are part of
 * dummy api because data model is not yet finalized for community
 */
ProfilePage.getCommunities = async (req) => {
    const PROFILE = db.collections.PROFILE.PROFILES;
    const COMMUNITY = db.collections.COMMUNITY.COMMUNITY;

    const key = { type: "profile" };
    const keys = { type: "community" };

    const luid = parseInt(req.uid);
    if (!req.uid || luid < 1) throw new Error("Unauthorized");

    try {
        if (req.body.tid) {
            let tid = parseInt(req.body.tid);
            if (tid < 1) throw new Error("Invalid tid");

            const profile = await db.findField(PROFILE, { ...key, tid });
            if (!profile) throw new Error("Cannot get profile by TID");
            const communities = profile.memberships.communities;
            let result = await db.findFields(COMMUNITY, { ...keys, tid: {
                $in: communities
            } });

            console.log('Hi' + result);
            return result;
        } 
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 07-07-2022
 * @description This function get discussions rooms which user has created
 */
 ProfilePage.getDiscussionRooms = async (req) => {
    const DEFAULT = db.collections.DEFAULT;
    const keys = { 
        type: "discuss_room",
        isVisible: true 
    };

    // const luid = parseInt(req.uid);
    const luid = 500;
    if (!luid || luid < 1) throw new Error("Unauthorized");

    try {
        // console.log('enter');
        const discussionRooms = await db.findFields(DEFAULT, {
            ...keys, uid: luid
        });
        console.log(discussionRooms);
        return discussionRooms;
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 07-07-2022
 * @description This function get the posts which user has created
 */
 ProfilePage.getPosts = async (req) => {
    const DEFAULT = db.collections.DEFAULT;
    const keys = { type: "post" };

    // const luid = parseInt(req.uid);
    const luid = 18;
    if (!luid || luid < 1) throw new Error("Unauthorized");

    try {
        // console.log('enter');
        const posts = await db.findFields(DEFAULT, {
            ...keys, uid: luid
        });
        console.log(posts);
        return posts;
    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 08-07-2022
 * @description This function will update the isVisible field in discussion room
 */

ProfilePage.showOrHideDiscussionRoom = async (req) => {
    const DEFAULT = db.collections.DEFAULT;
    const luid = 500;
    const keys = { type: "discuss_room", uid: luid };
    if (!luid || luid < 1) throw new Error("Unauthorized");

    try {
        let tid;
        if (req.body.tid) {
            tid = req.body.tid;
            if (tid < 0 || !tid) throw new Error('Invalid Tid');
        }
        const isVisible = req.body.isVisible;

        const result = await db.updateField(DEFAULT, keys, { $set: { "isVisible": isVisible } } )
        return result;

    } catch(err) {
        console.log(err.message);
    }
}

/**
 * @author Surojit
 * @date 09-07-2022
 * @description This function will get the accolades and stats of assets
 */
ProfilePage.getLeaderboard = async (req) => {

    const PROFILE = db.collections.PROFILE.PROFILES;
    const ACCOLADE = db.collections.PROFILE.ACCOLADES;
    const DEFAULT = db.collections.DEFAULT

    const key = { type: "profile" };

    const luid = parseInt(req.uid);
    // const luid = 1;
    if (!req.uid || luid < 1) throw new Error("Unauthorized");
    try {
        const keys = { type: "accolades" , uid: luid };
        const accolades = await db.findField(ACCOLADE, { ...keys });
        console.log(accolades);

        const eaglebuilderCount = await db.countDocuments(DEFAULT, { uid: luid, type: 'eaglebuilder' });
        console.log(eaglebuilderCount);
        const threadbuilderCount = await db.countDocuments(DEFAULT, { uid: luid, type: 'threadbuilder' });
        console.log(threadbuilderCount);
        const quizCount = await db.countDocuments(DEFAULT, { uid: luid, type: 'quiz' });
        console.log(quizCount);
        const articleCount = await db.countDocuments(DEFAULT, { uid: luid, type: 'article' });
        console.log(articleCount);

        return { accolades, eaglebuilderCount, threadbuilderCount, quizCount, articleCount };

       
    } catch(err) {
        console.log(err.message);
    }


    

}

const QUESTION = db.collections.PROFILE.QUESTION
ProfilePage.getQuestion = async (req) => {
    const uid = parseInt(req.uid);

    try {
        if (req.query.pid) {
            let pid = parseInt(req.query.pid);
            if (pid < 1 || !pid) throw new Error("Invalid pid");
            const keys = { type: "question" }
            const question = await db.findField(QUESTION, { ...keys, pid });
            if (!question) throw new Error("Cannot get question by pid");
            return { "Content": question.content, "Answer": question.answer }
        }
        const keys = {
            "type": "question",
            "isVisible": true
        }
        const page = parseInt(req.query.page) || 0
        const limitBy = parseInt(req.query.limitBy) || 8

        const result = await db.getFieldsWithPagination(QUESTION, keys, limitBy, page, { timestamp: -1 })
        const results = [];
        for (let i = 0; i < result.length; i++) { 
            let pid = parseInt(result[i].pid)
            let ans = await db.findField(ANSWER, { "question_pid" : pid } )
            results.push({ "Content":result[i].content, "Answer": ans == null? null : ans.content })
        }
        return results;
    } catch (err) {
        console.log(err.message)
    }
}

ProfilePage.insertQuestion = async (req) => {
    const uid = parseInt(req.uid);

    try {
        const tid = parseInt(req.body.tid)
        const content = req.body.content
        const answer = parseInt(req.body.answer)
        const cross_questions = req.body.cross_questions
        const parent_pid = parseInt(req.body.parent_pid)

        const questionPid = await db.incrObjectField('global', 'nextPid');

        const question = {
            uid: uid,
            pid: questionPid,
            tid: tid,
            answer: answer || 0,
            cross_questions: cross_questions || {},
            parent_pid: parent_pid,
            content: content,
            type: 'question',
            timestamp: Date.now(),
            isVisible : false
        }
        await db.update('qualities', { "qualities.quality_id": parent_pid }, { $push: { "qualities.$.questions": questionPid } })
        await db.setField(QUESTION, question)
        return questionPid
    } catch (err) {
        console.log(err.message)
    }
}

ProfilePage.updateQuestion = async (req) => {
    const uid = parseInt(req.uid);

    try {
        const visible = req.body.visible;
        const pid = parseInt(req.params.id);
        const payload = { "isVisible": visible };
        const key = {
            "type": "question",
            "pid": pid,
        }
        const result = await db.update(QUESTION, key, { $set: payload });

        return result === null ? { "updated": false } : result

    } catch (err) { console.log(err.message) }

}

const ANSWER = db.collections.PROFILE.ANSWER
ProfilePage.insertAnswer = async (req) => {
    const uid = parseInt(req.uid);

    try {
        const question_pid = parseInt(req.body.pid)
        const content = req.body.content
        const questions = req.body.questions
        const tid = parseInt(req.body.tid)

        const pid = await db.incrObjectField('global', 'nextPid');

        const question = {
            uid: uid,
            pid: pid,
            question_pid: question_pid,
            tid: tid,
            content: content,
            questions: questions || {},
            content: content,
            type: 'answer',
            timestamp: Date.now()
        }
        await db.setField(ANSWER, question)
        return pid
    } catch (err) {
        console.log(err.message)
    }
}

const PROFILES = 'profiles'
const SCHOOLS = 'schools'
ProfilePage.getSchools = async req => {
    const find = await db.findField(PROFILES, { "uid": req.uid })
    const {schools} = find.memberships;
    return await db.findFields(SCHOOLS, { pid: {$in: schools} });

}

ProfilePage.insertSchool = async req => {
    try {
        const result = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $push: { "memberships.schools": parseInt(req.body.school) } })
        return result.updated;

    } catch (error) { console.log(error.message) }
}

ProfilePage.updateSchool = async req => {
    try {
        const del = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $pull: { "memberships.schools": parseInt(req.params.id) } })
        const ins = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $push: { "memberships.schools": parseInt(req.body.school) } })

        if (del.updated == ins.updated == true) {
            return true;
        }

    } catch (error) { console.log(error.message) }

}

ProfilePage.deleteSchool = async req => {
    try {
        const result = await db.update(PROFILES, { "uid": parseInt(req.uid) }, { $pull: { "memberships.schools": parseInt(req.body.school) } })
        return result.updated
    } catch (error) { console.log(error.message) }

}