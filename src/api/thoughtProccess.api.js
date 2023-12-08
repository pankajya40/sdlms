const db = require('../database');
const Uploader = require('../controllers/FIleUpload');
const utils = require('../controllers/utils');

const thoughtProccess = module.exports

thoughtProccess.getTemplate = async req => {
    const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
    const tid = req.query.tid
    const limit = parseInt(req.query.limit) || 8
    const page = parseInt(req.query.page) || 0
    if (tid) {
        return await db.findField(THOUGHT_PROCCESS, {
            tid,
            type: "thought_proccess_template"
        })
    }
    const keys = {
        type: "thought_proccess_template",
    }
    const [templates, count] = await Promise.all([
        db.getFieldsWithPagination(THOUGHT_PROCCESS, keys, limit, page),
        db.countDocuments(THOUGHT_PROCCESS, keys),
    ]);
    return utils.paginate(`/app${req.url}`, templates, count, limit, page);
}
thoughtProccess.createTemplate = async req => {
    console.log(req.body)
    const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
    const uid = req.uid

    const description = req.body.description
    const title = req.body.title
    let blocks;
    try {
        blocks = JSON.parse(req.body.blocks);
    } catch {
        throw new Error('Blocks must be a proper JSON');
    }
    const uploads = (req.files != null ? req.files : {}).files ? await Uploader.uploadContent(req) : []
    const imageRaw = uploads.find(file => file.field === "image")
    const image = (imageRaw != null ? imageRaw : {}).url
    const tid = await db.incrObjectField('global', 'nextTid')
    const template = db.setField(THOUGHT_PROCCESS, {
        uid,
        tid,
        image,
        blocks,
        title,
        description,
        type: "thought_proccess_template"
    })
    if (!template) throw new Error("couldn't create template")
    return template
}
thoughtProccess.updateTemplate = async req => {
    const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
    const uid = req.uid

    const tid = req.body.tid
    const payload = {}
    if (req.body.description) payload.description = req.body.description
    if (req.body.title) payload.title = req.body.title
    const uploads = req.files?.files ? await Uploader.uploadContent(req) : []
    const image = uploads.find(file => file.field === "image")?.url
    if (image) payload.image = image

    try {
        if (req.body.blocks) {
            payload.blocks = JSON.parse(req.body.blocks);
        }
    } catch {
        throw new Error('Blocks must be a proper JSON');
    }

    const state = await db.updateField(THOUGHT_PROCCESS, {
        uid,
        tid,
        type: "thought_proccess_template"
    }, { $set: payload });
    return {
        updated: state.result.n === 1,
    };
}
thoughtProccess.deleteTemplate = async req => {
    const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
    const uid = req.uid

    const tid = req.body.tid
    const template = await db.findField(THOUGHT_PROCCESS, {
        uid,
        tid,
        type: "thought_proccess_template"
    })
    await db.removeField(THOUGHT_PROCCESS, {
        uid,
        pid: {
            $in: template.questions
        },
        type: "thought_proccess_question",
        tid
    })
    const removedTemplate = await db.removeField(THOUGHT_PROCCESS, {
        uid, tid, type: "thought_proccess_template"
    })
    return { deleted: removedTemplate.result.n > 0 }
}

thoughtProccess.getThoughtProccess = async req => {
    const collectionName = db.collections.MOBILE.THOUGHT_PROCCESS
    const pid = req.query.pid
    const parentPid = parseInt(req.query.parentPid)
    const limit = parseInt(req.query.limit) || 8
    const page = parseInt(req.query.page) || 0
    if (pid) {
        return await db.findField(collectionName, {
            pid,
            type: "thought_proccess"
        })
    }
    if (parentPid) {
        console.log("thought process");
        return await db.findField(collectionName, { parentPid, type: "thought_proccess" });
    }
    const keys = {
        type: "thought_proccess",
    }
    const [thoughtProccesses, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ]);
    return utils.paginate(`/app${req.url}`, thoughtProccesses, count, limit, page);
}
thoughtProccess.createThoughtProccess = async req => {
    const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
    const uid = req.uid

    let blocks;
    try {
        if (req.body.blocks) {
            blocks = JSON.parse(req.body.blocks);
        }
    } catch {
        throw new Error('Blocks must be a proper JSON');
    }

    const parentPid = parseInt(req.body.parentPid);

    const pid = await db.incrObjectField('global', 'nextPid');

    const [thought_proccess] = await Promise.all([
        db.setField(THOUGHT_PROCCESS, {
            uid,
            pid,
            parentPid,
            blocks,
            type: "thought_proccess"
        }),
        db.incrementCount(db.collections.DEFAULT, {pid}, 'thoughtprocess_count')
    ]);
    if (!thought_proccess) throw new Error("couldn't create template")
    return thought_proccess
}
// thoughtProccess.updateThoughtProccess = async req => {
//     const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
//     const uid = req.uid

//     const tid = req.body.tid
//     const payload = {}

//     const thoughtProccessUpdate = await db.update(THOUGHT_PROCCESS, {
//         uid,
//         tid,
//         type: "thought_proccess"
//     }, {
//         $set: payload
//     })
//     winston.error(JSON.stringify(thoughtProccessUpdate))
//     return { modified: thoughtProccessUpdate.updated || n > 0 }
// // }
// thoughtProccess.deleteThoughtProccess = async req => {
//     const THOUGHT_PROCCESS = db.collections.MOBILE.THOUGHT_PROCCESS
//     const uid = req.uid
//     if (!uid || uid < 1) throw new Error("Unauthorised")
//     const tid = req.body.tid
//     const thoughtProccess = await db.findField(THOUGHT_PROCCESS, {
//         uid,
//         tid,
//         type: "thought_proccess"
//     })
//     if (!thoughtProccess) throw new Error("given thought proccess does't exist!")
//     const questions = await db.findFields(THOUGHT_PROCCESS, {
//         uid,
//         tid,
//         question_id: {
//             $in: thoughtProccess.questions
//         }
//     })
//     await db.removeField(THOUGHT_PROCCESS, {
//         uid,
//         pid: {
//             $in: questions.map(question => question.answer)
//         },
//         type: "thought_proccess_answer"
//     })
//     await db.removeField(THOUGHT_PROCCESS, {
//         uid,
//         pid: {
//             $in: thoughtProccess.questions
//         },
//         type: "thought_proccess_question",
//         tid
//     })
//     const removedThoughtProccess = await db.removeField(THOUGHT_PROCCESS, {
//         uid, tid, type: "thought_proccess"
//     })
//     return { deleted: removedThoughtProccess.result.n > 0 }
// }