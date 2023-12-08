'use strict';

const winston = require('winston');
const groups = require('../groups');
const events = require('../events');
const db = require('../database');
const privileges = require('../privileges');
const User = require('../user');
const ObjectId = require('mongodb').ObjectId;
const categories = require('../categories');
const utils = require('../controllers/utils');
const posts = require('../posts');
const classes = require("../sdlms/classes");
const { resultsToBool } = require('../database/redis/helpers');

const socialScorecard = module.exports;
const collectionName = db.collections.DEFAULT
const rubricCollection = db.collections.GLOBAL.RUBRIC
const attributeCollection = db.collections.DT_THON.ATTRIBUTES
const templateCollection = db.collections.SCORECARD.TEMPLATE


socialScorecard.createScoreCard = async(req) => {
    // from creator side
    const data = req.body
    let projectId = parseInt(data.projectId)
    let attribute = data.attribute
    let uid = req.uid
    let subattributes = data.subattributes
    const userFields = ['username', 'displayname', 'picture', 'fullname', 'uid'];
	const userData = await User.getUserFields([uid], userFields);
    const pid = await db.incrObjectField('global', 'nextPid');
    const createdAt = Date.now()
    let payload = {
        pid,
        projectId,
        attribute,
        subattributes,
        userData,
        createdAt,
        type:'social_scorecard_template'
    }
    return await db.setField(db.collections.DEFAULT, payload)
}

socialScorecard.postEval = async(req) => {
    // posting scored data
    const data = req.body
    let attribute = data.attribute
    let projectId = parseInt(data.projectId)
    const uid = req.uid
    let subattributes = data.subattributes || []
    const userFields = ['username', 'displayname', 'picture', 'fullname', 'uid'];
	const userData = await User.getUserFields([uid], userFields);
    const pid = await db.incrObjectField('global', 'nextPid');
    const createdAt = Date.now()
    const score = data.score
    const observation = data.observation || ''

    let payload = {
        pid,
        projectId,
        uid,
        attribute,
        subattributes,
        userData,
        score,
        observation,
        createdAt,
        type:'social_scorecard'
    }

    return await db.setField(db.collections.DEFAULT, payload)
}





socialScorecard.addScore = async(req) => {
    let data = req.body
    let attribute = data.attribute
    let pid = parseInt(data.pid)
    let projectId = parseInt(data.projectId)
    let score = parseInt(data.score)
    let observation = data.observation || ''
    let subattr = data.subattribute
    let overallScore = ''
    let overallObservation = ''
    const uid = req.uid

    let keys = {
        attribute,
        pid,
        uid,
        type:'social_scorecard'
    }
    let updates = {
        $set:{
            "subattributes.$[updateSubattr].observation": observation,
            "subattributes.$[updateSubattr].score": score,
        }
    }
    if(data.overall){
        overallScore = data.overall.score
        overallObservation = data.overall.observation || ''
        updates.$set.score = overallScore
        updates.$set.observation = overallObservation
    }
    let collectionName = db.collections.DEFAULT
    let res = await db.updateField(collectionName, keys, updates,{
            "arrayFilters":[{"updateSubattr.name":subattr}]
        }
    );

    if(res.result.n){
        return await db.findField(collectionName, keys)
    }
}
//  evaluator side

socialScorecard.getAssignments = async(req) => {
    const data = req.body
    let uid = req.uid;
    let keys = {
        type:'submission',
        scorecardId:{$exists:true}
    }
    let res = await db.findFields(collectionName, keys)
    return res;
}

socialScorecard.getScoreCard = async(req) => {

    const {templateId, tid} = req.params
    if(!templateId && !tid) throw new Error('Tid or Template Id was not passed')
    let keys = {
        pid:parseInt(templateId),
        type:'social_scorecard_template'
    }
    let template = await db.findField(rubricCollection, keys);
    // return template;
    keys = {
        tid:parseInt(tid),
        _key:`topic:${tid}`,
        type:'project'
    }
    let res = await db.findField(collectionName, keys);
    let data = await this.referenceResolver(template);
    // res.attributes = data.attributes
    return {project:res, attributes: data.attributes};
}

socialScorecard.referenceResolver = async(data) => {
    let attributes = await Promise.all(data.attributes.map(async (e,i) => {
        let fields = {...e}
        // find each attribute
        let res = await db.findField(attributeCollection, {pid:e.attributeId, type:'social_scorecard_attribute'})
        fields.description = res.description
        fields.title = res.title
        fields.subparams = await Promise.all(e.subparams.map(async (ele,i) => {
            let rubric = {...ele}
            let res = await db.findField(rubricCollection, {pid:ele.rubricId, type:'scoring_rubric'})
            rubric.scheme = res.scheme;
            rubric.description = res.description
            // rubric.title = res.title
            return rubric
        }))
        return fields;
    }))
    data.attributes = attributes
    return data;
}

socialScorecard.viewScore = async(req) => {
    let uid = parseInt(req.params.uid)
    let projectId = parseInt(req.params.projectId)
    let keys = {
        uid,
        projectId,
        status:'evaluated'
    }
    return await db.findField(collectionName, keys);
}


//  creator side
socialScorecard.createRubric = async(req) => {
    const data = req.body;
    const ratings = data.ratings;
    const pid = await db.incrObjectField('global', 'nextPid');
    const title = data.title
    if(!title) throw new Error('Rubric Title not supplied!');
    const uid = req.uid;

    let payload = {
        pid,
        uid,
        title,
        ratings,
        type:'scoring_rubric'
    }
    if(!uid && uid!=0){
        delete payload.uid
        payload.organisation = data.organisation
    }
    return await db.setField(rubricCollection, payload);
    // return await db.findField(rubricCollection, {uid:232,type:'social_scorecard_rubric'});

}

socialScorecard.createAttribute = async(req) => {
    const data = req.body
    let title = data.title
    let description = data.description
    let subparams = data.subparams || []
    const pid = await db.incrObjectField('global', 'nextPid');
    const uid = req.uid;
    let payload = {
        pid,
        uid,
        title,
        description,
        subparams,
        type:'social_scorecard_attribute'
    }
    //  change collection
    return await db.setField(attributeCollection, payload);
}


socialScorecard.getCards = async(req) => {
    //  get all scorecard templates with pagination
    let uid = req.uid
    let status = req.query.status
    let title = req.query.title
    let tid = parseInt(req.query.tid)
    let queryuid = parseInt(req.query.uid)
    let state = req.query.active
    let keys = {
        type:'social_scorecard_template'
    }

    if(state){
        if(state =="true") keys.isActive = true
        if(state =="false") keys.isActive = false
    }
    if(queryuid == uid){
        keys.uid = uid
    }
    if(status){
        keys.status = status
        if(status=='draft') keys.uid = uid;
    }

    if(tid) keys.tid = tid;
    if(title){
        keys.title = {$regex:title, $options:'si'}
    }


    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    let assets = await db.getFieldsWithPagination(templateCollection, keys, limit, page, {createdAt: -1})
    assets = await Promise.all(assets.map(async (ele) => {
        const count = await db.countDocuments(db.collections.DEFAULT, {
            scorecardId: ele.tid,
            type:'project'
        })
        return {...ele, associationCount:count}
    }))
    const count = await db.countDocuments(templateCollection, keys)
    return utils.paginate(`/social_scorecard${req.url}`, assets, count, limit, page)
}


socialScorecard.getPublishedScorecard = async(req) => {
    let pid = parseInt(req.params.pid)
    let tid = parseInt(req.params.tid)
    let keys = {
        tid,
        pid,
        status:'published',
        type:'social_scorecard'
    }
    let res = await db.findField(collectionName, keys);
    let {templateId} = res
    let response = await db.findField(rubricCollection, {pid:templateId, type:'social_scorecard_template'});
    let data = await this.referenceResolver(response);
    res.attributes = data.attributes
    return res;
}

socialScorecard.getDraftScorecard = async(req) => {
    let pid = parseInt(req.params.pid)
    let keys = {
        pid,
        type:'social_scorecard_template'
    }
    let res = await db.findField(rubricCollection, keys);
    return await this.referenceResolver(res);
}

socialScorecard.associateScorecard = async(req) => {
    const data = req.data;
    const scorecardId = data.scorecardId;
    const tid = data.projectId;

    let response = await db.findField(templateCollection,
        {tid:scorecardId, type:'social_scorecard_template'}
    );
    if(response.status == 'published' && response.isActive){
        //
    } else throw new Error("This Scorecard Template cannot be used!");

    let keys = {
        tid,
        _key:`topic:${tid}`,
        type:'project'
    }
    let res = await db.updateField(collectionName, keys, {$set:{scorecardId: scorecardId}});
    return await db.findField(collectionName, keys);
}

socialScorecard.createTemplate = async(req) => {
    const data = req.body;
    const tid = await db.incrObjectField('global', 'nextTid');
    const attributes = data.attributes || []
    const title = data.title || ''
    const description = data.description || ''
    const uid = parseInt(req.uid);

    const createdAt = Date.now()
    let payload = {
        tid,
        uid,
        title,
        description,
        attributes,
        status:'draft',
        isActive: false,
        createdAt,
        type:'social_scorecard_template'
    }
    return await db.setField(templateCollection, payload);
}

socialScorecard.updateTemplate = async(req) => {
    let { tid, title, attribute } = req.body;

    tid = parseInt(tid);
    const uid = parseInt(req.uid);

    // if(!attribute.title) throw new Error('Attribute Title is required!');
    let keys = {
        tid,
        uid,
        status:'draft',
        type:'social_scorecard_template',
    }

    // if(attribute){
    //     if(!attribute.subattributes) throw new Error('No subattributes passed!');
    //     let template = await db.findField(templateCollection, keys)
    //     let attrs = template.attributes
    //     console.log(attrs)
    //     if(!template) throw new Error("No template found!");
    //     const nextAttrId = Math.max(...attrs.map(ele => ele.attributeId), 0) + 1;
    //     attribute.subattributes = this.addSubIds(attribute.subattributes);
    //     attribute = {attributeId: nextAttrId, ...attribute}
    //     updates.$push = {attributes:attribute}
    // }
    // if(description) updates.$set.description = description

    let res = await db.updateField(templateCollection, keys, {$set: {title}});
    if(res.result.n){
        return await db.findField(templateCollection, keys);
    }
}

socialScorecard.updateAttribute = async(req) => {
    const data = req.body;
    const uid = req.uid;
    const tid = parseInt(data.tid);
    const attributeId = parseInt(data.attributeId);
    const {title, description, weightage} = data;
    let keys = {
        tid,
        uid,
        status:'draft',
        type:'social_scorecard_template',
    }
    let updates = {
        $set:{}
    }
    if(title) updates.$set["attributes.$[attribute].title"] = title
    if(description) updates.$set["attributes.$[attribute].description"] = description
    if(weightage) updates.$set["attributes.$[attribute].weightage"] = weightage

    if(data.subattributes){
        updates.$set["attributes.$[attribute].subattributes"] =  this.addSubIds(data.subattributes);
    }

    let res = await db.updateField(templateCollection, keys, updates, {
        "arrayFilters":[{"attribute.attributeId":attributeId}]
    });
    if(res.result.n){
        return await db.findField(templateCollection, keys);
    }
}


socialScorecard.publishCard = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid);
    const uid = req.uid;
    let keys = {
        uid,
        tid,
        status:'draft'
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error('No Scorecard Template found');
    const attributes = this.addIds(template.attributes)
    // return attributes;
    let res = await db.updateField(templateCollection, keys, {
        $set:{
            status:'published',
            isActive: true,
            attributes,
    }});
    keys.status = 'published'
    return await db.findField(templateCollection, keys);
}
socialScorecard.addSubIds = (data) => {
    return data.map((subattr,i) => {
        return {subattributeId:i+1, ...subattr}
    })
}


socialScorecard.addIds = (data) => {
    return data.map((attr,i) => {
        let obj = {attributeId:i+1, ...attr}
        obj.subattributes = attr.subattributes.map((subattr,i) => {
            return {subattributeId: i+1, ...subattr}
        })
        return obj
    })
}

socialScorecard.updateApplicants = async(req) => {
    const data = req.body;
    const uids = Array.isArray(data.uids)?data.uids:[data.uids];
    const pid = parseInt(data.pid);
    const tid = parseInt(data.tid);
    const status = 'not evaluated'
    let applicantData = uids.map(e => {
        return {uid:e, status}
    })
    let keys = {
        _key:`topic:${tid}`,
        tid,
        type:'project',
        'scorecards.pid':pid
    }
    let res = await db.updateField(collectionName, keys, {
        $push:{"scorecards.$[card].applicants":{$each:applicantData}}
    },{
        "arrayFilters":[{"card.pid":pid}]
    })

    if(res.result.n){
        return await db.findField(collectionName, keys);
    }
}
socialScorecard.updateEvaluators = async(req) => {
    const data = req.body;
    const evalUid = parseInt(data.evaluator)
    const uid = parseInt(data.applicantUid);
    const tid = parseInt(data.tid);

    let keys = {
        uid,
        tid,
        _key:`topic:${tid}`,
        type:'submission'
    }
    let res = await db.updateField(collectionName, keys, {$set:{evaluator:evalUid}});
}

socialScorecard.editTemplate = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid);
    const uid = req.uid;
    const title = data.title
    const description = data.description
    let updates = {
        $set:{}
    }
    let keys = {
        tid,
        uid,
        status:"draft",
        type:"social_scorecard_template"
    }
    if(title) updates.$set.title = title
    if(description) updates.$set.title = description
    let res = await db.updateField(templateCollection, keys, updates);
    return await db.findField(templateCollection, keys);
}

socialScorecard.addAttribute = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid);
    const uid = req.uid;
    let attribute = data.attribute;
    let attributeId = await db.incrObjectField('global', 'nextAttributeId');
    let payload = {
        attributeId,
        title: attribute.title!=null?attribute.title:"",
        description: attribute.description!=null?attribute.description:"",
        weightage: attribute.weightage!=null?attribute.weightage:"",
        subattributes: []
    }
    let keys = {
        tid,
        uid,
        status:"draft",
        type:"social_scorecard_template"
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error("No Template Found!");
    let res = await db.updateField(templateCollection, keys, {
        $push:{attributes: payload}
    });
    if(!res) throw new Error("Unauthorized write access!");
    return {attributeId, attributeData: payload};
}

socialScorecard.editAttribute = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid);
    const uid = req.uid;
    let attributeId = parseInt(data.attributeId)
    let {attribute} = data
    let keys = {
        tid,
        uid,
        status:"draft",
        type:"social_scorecard_template"
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error("No Template Found!");
    let attr = template.attributes.find((e) => e.attributeId == attributeId);
    if (!attr) throw new Error("Attribute wasn't found!");

    let parsedItem = attr;

    ['title', 'description', 'weightage'].forEach(field => {
        if(attribute[field]){
            parsedItem[field] = attribute[field];
        }
    })

    let attrs = template.attributes.filter(e => e.attributeId!=attributeId);
    attrs.push(parsedItem);
    let res = await db.updateField(templateCollection, keys, { $set: {attributes: attrs} }, {upsert: false});
    if(!res) throw new Error("Unauthorized write access!");
    return {
        updated: res.result.nModified,
        template: await db.findField(templateCollection, keys)
    }
}

socialScorecard.deleteAttribute = async(req) => {
    const data = req.body;
    const uid = req.uid;
    const tid = parseInt(data.tid);
    const attributeId = parseInt(data.attributeId);
    let keys = {
        tid,
        uid,
        status:'draft',
        type:'social_scorecard_template',
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error("No Template Found!");
    let updates = {
        $pull:{'attributes' : {attributeId}}
    }
    let res = await db.updateField(templateCollection, keys, updates);
    if(!res) throw new Error("Unauthorized write access!");
    return {
        deleted: res.result.nModified,
        template: await db.findField(templateCollection, keys)
    }
}

socialScorecard.addSubattribute = async(req) => {
    let data = req.body
    const tid = parseInt(data.tid);
    const uid = req.uid;
    let attributeId = parseInt(data.attributeId);
    let subattribute = data.subattribute;
    let subattributeId = await db.incrObjectField('global', 'nextSubattributeId');
    let payload = {
        subattributeId,
        title: subattribute.title!=null?subattribute.title:"",
        description: subattribute.description!=null?subattribute.description:"",
        weightage: subattribute.weightage!=null?subattribute.weightage:"",
        rubric: subattribute.rubric!=null?subattribute.rubric:"",
        ratings: subattribute.ratings!=null?subattribute.ratings:[],
    }

    let keys = {
        tid,
        uid,
        status:'draft',
        "attributes.attributeId":attributeId,
        type:'social_scorecard_template',
    }
    const res = await db.updateField(templateCollection, keys, {
        $push: { "attributes.$.subattributes": payload },
    });

    if (!res) {
        throw new Error("Unauthorized write access!");
    }
    return {subattributeId, subattribute: payload};
}

socialScorecard.editSubattribute = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid);
    const uid = req.uid;
    let attributeId = parseInt(data.attributeId);
    let subattributeId = parseInt(data.subattributeId);
    let {subattribute} = data
    let keys = {
        tid,
        uid,
        status:"draft",
        type:"social_scorecard_template"
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error("No Template Found!");
    let attr = template.attributes.find((e) => e.attributeId == attributeId);
    let subattr = attr.subattributes.find((e) => e.subattributeId == subattributeId);
    if (!Object.keys(subattr).length) throw new Error("SubAttribute wasn't found!");

    let updates = {
        $set:{}
    }
    const fields = ['title', 'description', 'weightage', 'ratings', 'rubric']
    fields.forEach(field => {
        if(subattribute[field]){
            updates.$set[`attributes.$[attribute].subattributes.$[subattribute].${field}`] = subattribute[field]
        }
    })

    let res = await db.updateField(templateCollection, keys, updates, {
        arrayFilters: [
            { "attribute.attributeId": attributeId },
            { "subattribute.subattributeId": subattributeId },
        ],
    });
    if(!res) throw new Error("Unauthorized write access!");
    return {
        updated: res.result.nModified,
        template: await db.findField(templateCollection, keys)
    };
}

socialScorecard.deleteSubattribute = async(req) => {
    const data = req.body;
    const uid = req.uid;
    const tid = parseInt(data.tid);
    const attributeId = parseInt(data.attributeId);
    const subattributeId = parseInt(data.subattributeId);
    let keys = {
        tid,
        uid,
        status:'draft',
        type:'social_scorecard_template',
    }
    let template = await db.findField(templateCollection, keys);
    if(!template) throw new Error("No Template Found!");
    let updates = {
        $pull:{'attributes.$[attribute].subattributes' : {subattributeId}}
    }
    let res = await db.updateField(templateCollection, keys, updates, {
        arrayFilters: [
            { "attribute.attributeId": attributeId },
        ],
    });
    if(!res) throw new Error("Unauthorized write access!");
    return {
        deleted: res.result.nModified,
        template: await db.findField(templateCollection, keys)
    }
}

socialScorecard.getScorecardDetails = async(req) => {
    const data = req.body
    const tid = parseInt(req.query.tid)
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    if(!tid) throw new Error("tid was not passed!")
    const keys = {
        scorecardId: tid,
        type: 'project'
    }
    let assets = await db.getFieldsWithPagination(collectionName, keys, limit, page, {createdAt: -1});
    const fields = ['tid', 'title', 'scorecardAssociationTime']
    assets = assets.map(e => {
        let obj = {}
        fields.forEach(field => {
            obj[field] = e[field] || null
        })
        return obj;
    })
    const count = await db.countDocuments(collectionName, keys)
    let paginatedData = utils.paginate(`/social_scorecard${req.url}`, assets, count, limit, page)
    paginatedData.total = count
    return paginatedData
}

socialScorecard.deleteTemplate = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid)
    const uid = req.uid
    const keys = {
        tid,
        uid,
        type:'social_scorecard_template'
    }
    let template = await db.findField(templateCollection, keys)
    if(!template) throw new Error("The template with this tid does not exist!")
    if(template.isActive == true) throw new Error("Can't delete the template. The template is in active state")
    const count = await db.countDocuments(collectionName, {
        scorecardId: tid,
        type:'project'
    })
    if(count) throw new Error("Cannot delete this template as it is being used in projects");
    const res = await db.removeField(templateCollection, keys);
    if(res.result.n){
        return {deleted: true}
    }
}
socialScorecard.changeState = async(req) => {
    const data = req.body;
    const tid = parseInt(data.tid)
    const uid = req.uid
    let state = JSON.parse(data.state.toLowerCase());
    const keys = {
        tid,
        uid,
        type:'social_scorecard_template'
    }
    let template = await db.findField(templateCollection, keys)
    if(!template) throw new Error("The template with this tid does not exist!")
    const res = await db.updateField(templateCollection, keys, {$set:{
        isActive:state
    }})
    if(res.result.n){
        return await db.findField(templateCollection, keys)
    }
}