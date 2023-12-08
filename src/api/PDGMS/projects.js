const db = require("../../database");
const user = require("../../user")
const ObjectId = require("mongodb").ObjectId
const utilities = require('../../controllers/utils')
const project = module.exports;
const collectionName = db.collections.PDGMS.PROJECT;


/**
 * @date 25-10-2022
 * @author Amrit Malviya
 * @description The below functions deals with the CRUD Operations on projects.
 */

/**
 *  Get Projects by using all ids or any pair of the ids or any one of the ids (uid, projectId)
 * if uid is not mentioned then it will fetch the projects of loggedIn user.
 * Fetching of projects is done using the id of the creator of the projects not by assignee.
*/
project.getProject = async function(data){
	
	const uid = parseInt(data.uid);
	const userId = parseInt(data.query.uid) || '' ;
	const departmentId =parseInt(data.query.departmentId); //mongodb objectId of the project
    const page	= parseInt(data.query.page) || 0;
	const limit = parseInt(data.query.limit) || 5;
    const order = { _id: -1 };
	// const projectId = ObjectId(data.query.Id);//mongodb objectId


    var keys = {};
	// if(userId)
	// keys.createdBy=uid;
	// if(projectId)
	// keys._id=projectId;	
	if(departmentId)
	keys = Object.assign(keys,{_key:"department:"+departmentId});
	if(uid)
	keys.createdBy = 324;

// console.log(keys);


	const [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    return utilities.paginate(`/pdgms${data.url}`, responses, count, limit, page);

}
// Create project
project.createProject = async function (data){

	const uid = parseInt(data.uid); // when user login

	const payload = {
		
        _key : `department:${data.body.departmentId}`, //id of the department, not mandatory ref
        organization : `organization:${data.body.organizationId}`, // data.organization ref
		// projectId: `user:${uid}`,		
		name: data.body.projectName || "",
		description: data.body.description || "",
		projectType: data.body.projectType || "",
		createdBy: uid, // uid
        members : [{ 
            // member : data.body.member,
            // role : "roles:1", // coming soon
            // dateAdded :  utilities.getISOTimestamp(),
            // status : data.body.statusofMember || "inactive", // [active, inactive, removed]
        }],//member of projects
		preRequisite: data.body.prerequisite || "",
		estimateDuration: data.body.estimateDuration || "",
		priority: data.body.priority,
		assignedTo: data.body.assignedTo,
		status: data.body.status || "notstarted",
        dependencies : ["projects:1"], //dependencies of the project // coming from the project  // referencing
        projectOwner : uid,   //owner of the project which is uid
        // budget : Number, //currency data type 
		currentStatus: data.body.currentStatus || "notstarted",
		plannedStartDate : data.body.plannedStartDate,
		plannedEndDate : data.body.plannedEndDate,
		actualStartDate : data.body.actualStartDate,
		actualEndDate : data.body.actualEndDate,
		completeDate : data.body.completeDate,
		createdAt: utilities.getISOTimestamp(),
	};
	return await db.setField(collectionName, payload); 

};

// Update a project by projectid 
project.updateProject = async function (data){

	const uid = parseInt(data.uid); // just leader can edit this thing 
	// if not leader will throw him to a different page
	const currentTime = utilities.getISOTimestamp();
	const projectId = ObjectId(data.params.Id);//mongodb objectId

	if(!projectId){
		throw new Error("Id of the project is not supplied");
	}
	var keys = {
		_id:projectId,
		createdBy:uid,
		type: project
	};
    let payload = {};
	['projectName', 'projectDescription', 'dependencies' ].forEach((element) =>
	{
		if (data.body[element]) {
			payload[element] = data.body[element];
		}
	});
	payload.updatedAt = currentTime;


    let state = await db.updateField(collectionName, keys, {$set: payload});
	return {
		updated: state.result.n === 1
	}
			

};

// Delete a project by projectid
//Assumption :- only creator of project can delete project.
project.deleteProject = async function (data){

	const uid = parseInt(data.uid);
	const projectId = ObjectId(data.params.Id);//mongodb objectId
	if(!projectId){
		throw new Error("Id of the project is not supplied");
	}
	const keys = {
		_id:projectId,
		createdBy : uid
	}
	const state = await db.removeField(collectionName, keys);
	if (state.result.n === 1) {
		return {
			deleted: true,
		};
	}
	return {
		deleted: false,
	};
};