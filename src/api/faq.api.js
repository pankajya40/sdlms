"use strict"
const db = require("../database")
const user = require("../user")
const utilities = require("../controllers/utils")
const ObjectId = require("mongodb").ObjectId


/**
 * @author: Awwal Adewuyi
 * @description: Crud operations for GLOBAL FAQ
 */


const collectionName = db.collections.GLOBAL.FAQ

const faq = module.exports


faq.getFaq = async (req, res) => {
    const uid = parseInt(req.uid)
    const page = parseInt(req.query.page) || 0
	const limit = parseInt(req.query.limit) || 5

    const order = { _id: -1 };

    const keys = {
        uid,
        type: 'faq'
    }
    const [faqs=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys)
	])

    let faqsData = await Promise.all(faqs.map( async(elem)=>{
        if(elem.question & elem.answer){
            let faq =  await db.findField(collectionName, {faqId: ObjectId(elem._id)} )
            return {...elem, faq}
        } else{
            console.log('No Frequently Asked Questions available')
        }
    }))

    return utilities.paginate(`/help${req.url}`, faqsData, count, limit, page)
}


faq.createFaq = async (req, res) => {
    const uid = parseInt(req.uid)
    const payload = { uid }

    payload.type = 'faq'
    payload.entityType = req.body.entityType =! null ? req.body.entityType: "" //e.g. threadbuilder
    payload.faqs = []
  
    return await db.setField(collectionName, payload)  
}  

faq.addFaQnA = async(req, res, next) => {
    const uid = parseInt(req.uid);
	const tid = parseInt(req.body.tid)
	if (!tid) throw new Error("FAQ tid is required")
    		
	const keys = {
        uid,
		tid,
		type: 'faq'
	}
	
    let faQnA
    faQnA.faqId = await db.incrObjectField('global', 'nextPid')
	faQnA.question =  req.body.question =! null ? req.body.question: ""
	faQnA.answer = req.body.answer =! null ? req.body.answer: "" 
	
	
    await db.updateField(collectionName, keys, { $addToSet: {faqs: faQnA}})

    return {faQnA}   
}

faq.editFaQnA = async (req, res, next) => {
    const uid = parseInt(req.uid)
    const faqId = parseInt(req.body.faqId)
    // const [ faq ] = req.body
    // if (!req.uid || luid < 1) throw new Error("Unauthorized") //use middleware to checked if loggedin
    
    const mainFaqTid = parseInt(req.body.tid)
    if(!mainFaqTid) throw new Error('Main FAQ tid is required')
    
    let mainFaq = db.findField(collectionName, {tid: mainFaqTid, type: 'faq'})
    if (!mainFaq) throw new Error('Main FAQ not found')
    
    let { faqs } = mainFaq
    if(!faqs) throw new Error('No FAQs present!')
    
    let _faq = find((faq) => faq.faqId == faqId)
    if(!Object.keys(_faq).length) throw new Error("No FAQ with that Id")

    let newFaQnA = {
        faqId: faqId,
		question: req.body.question =! null ? req.body.question: "",
		answer: req.body.answer =! null ? req.body.answer: "" 
    }

    updatedFaq = faqs.filter((elem)=> elem.faqId != faqId)
    updatedFaq.push(newFaQnA)

    const keys = {
        uid,
        tid: mainFaqTid,
        type: 'faq',
    }    

    await Promise(db.updateField(collectionName, keys, {$set: {faQnA: newFaQnA} }))

    return {newFaQnA}
}

faq.deleteFaQnA = async (req, res) => {
    const uid = parseInt(req.uid)
    const faqId = req.params
   
    const mainFaqTid = parseInt(req.body.tid)
    if(!mainFaqTid) throw new Error('Main FAQ tid is required')
    
    let mainFaq = db.findField(collectionName, {tid: mainFaqTid, type: 'faq'})
    if (!mainFaq) throw new Error('Main FAQ not found')
    
    let { faqs } = mainFaq
    if(!faqs) throw new Error('No FAQs present!')
    
    let _faq = find((faq) => faq.faqId == faqId)
    if(!Object.keys(_faq).length) throw new Error("No FAQ with such id found")
    
    const keys = {
        uid,
        tid : mainFaqTid,
        type: 'faq',
        "_faq.faqId": faqId
    }
    
    let state = await db.updateField(collectionName, keys, {$pull: {"_faq.faqId": faqId}}) 
    
    console.log(state) //wanna see the result
    console.log(state.result) 
    console.log(state.result.n) 
    // return { deleted: state.result.n === 1 }
}

faq.updateFaq = async (req, res) => {}

faq.deleteFaq = async (req, res) => {
    const {  id } = req.params;
    const keys = {_id: ObjectId(id)}

    let faq = await db.findField(collectionName, keys)
    if (!faq) {
        throw new Error('No leave application was found with the supplied Id')
    }

    if (faq.uid != parseInt(req.uid)) {
        throw new Error('You are not authorized to delete this application')
    }
    
    let state = await db.removeField(collectionName, {...keys, uid})
    return { deleted: state.result.n === 1 }
}






// 
// var faq = {
//     type : "faq",
//     entityType : string //threadbuilder
//     faqs : [
//         {
//             question : string //question 
//             answer : tinymc driven html 
//         }
//     ]
// }

// Growth team - tecch products that organization as well as indiviual growth
// pedatech - learning (SDMLS) self growth and social growth
